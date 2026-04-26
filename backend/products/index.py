import json
import os
import base64
import uuid
import psycopg2
import boto3

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Id",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def check_admin(event, cur):
    auth = event.get("headers", {}).get("X-Session-Id", "")
    if not auth or ":" not in auth:
        return None
    parts = auth.split(":", 1)
    user_id, pw_hash = parts[0], parts[1]
    cur.execute(
        f"SELECT id, name, is_admin FROM {SCHEMA}.users WHERE id = {user_id} AND password_hash = '{pw_hash}'"
    )
    row = cur.fetchone()
    if not row:
        return None
    return {"id": row[0], "name": row[1], "is_admin": row[2]}


def upload_image(b64_data: str, content_type: str = "image/jpeg") -> str:
    s3 = get_s3()
    key = f"products/{uuid.uuid4()}.jpg"
    if "," in b64_data:
        b64_data = b64_data.split(",", 1)[1]
    data = base64.b64decode(b64_data)
    s3.put_object(Bucket="files", Key=key, Body=data, ContentType=content_type)
    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    return f"https://cdn.poehali.dev/projects/{access_key}/files/{key}"


def handler(event: dict, context) -> dict:
    """CRUD товаров: получение каталога (GET /), создание (POST /), обновление (PUT /{id}), удаление (DELETE /{id})."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    path = event.get("path", "/")
    method = event.get("httpMethod", "GET")
    body = json.loads(event.get("body") or "{}")

    conn = get_conn()
    cur = conn.cursor()

    try:
        # GET / — публичный список активных товаров
        if method == "GET" and (path.endswith("/products") or path == "/"):
            cur.execute(
                f"SELECT id, name, category, price, description, sizes, tag, tag_color, images FROM {SCHEMA}.products WHERE is_active = TRUE ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
            products = []
            for r in rows:
                products.append({
                    "id": r[0], "name": r[1], "category": r[2],
                    "price": r[3], "description": r[4], "sizes": r[5] or [],
                    "tag": r[6], "tagColor": r[7], "images": r[8] or [],
                })
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"products": products})}

        # GET /admin — все товары включая неактивные (только для админа)
        if method == "GET" and path.endswith("/admin"):
            user = check_admin(event, cur)
            if not user or not user["is_admin"]:
                return {"statusCode": 403, "headers": CORS, "body": json.dumps({"error": "Нет доступа"})}
            cur.execute(
                f"SELECT id, name, category, price, description, sizes, tag, tag_color, images, is_active, created_at FROM {SCHEMA}.products ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
            products = []
            for r in rows:
                products.append({
                    "id": r[0], "name": r[1], "category": r[2],
                    "price": r[3], "description": r[4], "sizes": r[5] or [],
                    "tag": r[6], "tagColor": r[7], "images": r[8] or [],
                    "is_active": r[9], "created_at": str(r[10]),
                })
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"products": products})}

        # POST / — создать товар (только админ)
        if method == "POST":
            user = check_admin(event, cur)
            if not user or not user["is_admin"]:
                return {"statusCode": 403, "headers": CORS, "body": json.dumps({"error": "Нет доступа"})}

            name = body.get("name", "").strip()
            category = body.get("category", "").strip()
            price = int(body.get("price", 0))
            description = body.get("description", "").strip()
            sizes = body.get("sizes", [])
            tag = body.get("tag", "").strip()
            tag_color = body.get("tagColor", "from-purple-500 to-pink-500")

            if not name or not category or not price:
                return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните обязательные поля"})}

            # Загружаем фото
            uploaded_images = []
            for img_obj in body.get("images", []):
                url = upload_image(img_obj["data"])
                uploaded_images.append({"url": url, "label": img_obj.get("label", "Фото")})

            sizes_arr = "{" + ",".join(sizes) + "}"
            images_json = json.dumps(uploaded_images).replace("'", "''")

            cur.execute(
                f"""INSERT INTO {SCHEMA}.products (name, category, price, description, sizes, tag, tag_color, images)
                VALUES ('{name.replace("'", "''")}', '{category}', {price}, '{description.replace("'", "''")}',
                '{sizes_arr}', '{tag}', '{tag_color}', '{images_json}')
                RETURNING id"""
            )
            new_id = cur.fetchone()[0]
            conn.commit()

            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"id": new_id, "message": "Товар создан"})}

        # DELETE /{id} — удалить (мягко — is_active = false)
        if method == "DELETE":
            user = check_admin(event, cur)
            if not user or not user["is_admin"]:
                return {"statusCode": 403, "headers": CORS, "body": json.dumps({"error": "Нет доступа"})}

            parts = path.rstrip("/").split("/")
            product_id = int(parts[-1])
            cur.execute(f"UPDATE {SCHEMA}.products SET is_active = FALSE WHERE id = {product_id}")
            conn.commit()
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"message": "Товар удалён"})}

        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Not found"})}

    finally:
        cur.close()
        conn.close()
