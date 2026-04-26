import json
import os
import hashlib
import secrets
import psycopg2
from datetime import datetime

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Id",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def make_session_token() -> str:
    return secrets.token_hex(32)


def handler(event: dict, context) -> dict:
    """Авторизация: регистрация (/register) и вход (/login), выход (/logout), проверка сессии (/me)."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    path = event.get("path", "/")
    method = event.get("httpMethod", "GET")
    body = json.loads(event.get("body") or "{}")

    conn = get_conn()
    cur = conn.cursor()

    try:
        # --- /register ---
        if path.endswith("/register") and method == "POST":
            email = (body.get("email") or "").strip().lower()
            password = body.get("password") or ""
            name = (body.get("name") or "").strip()

            if not email or not password or not name:
                return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните все поля"})}

            cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = '{email}'")
            if cur.fetchone():
                return {"statusCode": 409, "headers": CORS, "body": json.dumps({"error": "Email уже зарегистрирован"})}

            pw_hash = hash_password(password)
            # Первый пользователь автоматически становится администратором
            cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.users")
            user_count = cur.fetchone()[0]
            is_admin = user_count == 0

            cur.execute(
                f"INSERT INTO {SCHEMA}.users (email, password_hash, name, is_admin) VALUES ('{email}', '{pw_hash}', '{name}', {is_admin}) RETURNING id, name, email, is_admin"
            )
            row = cur.fetchone()
            conn.commit()
            token = f"{row[0]}:{pw_hash}"

            return {
                "statusCode": 200,
                "headers": CORS,
                "body": json.dumps({"token": token, "user": {"id": row[0], "name": row[1], "email": row[2], "is_admin": row[3]}}),
            }

        # --- /login ---
        if path.endswith("/login") and method == "POST":
            email = (body.get("email") or "").strip().lower()
            password = body.get("password") or ""

            if not email or not password:
                return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Введите email и пароль"})}

            pw_hash = hash_password(password)
            cur.execute(
                f"SELECT id, name, email, is_admin FROM {SCHEMA}.users WHERE email = '{email}' AND password_hash = '{pw_hash}'"
            )
            row = cur.fetchone()
            if not row:
                return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Неверный email или пароль"})}

            token = make_session_token()
            # Save token as part of password_hash field trick — store session token separately
            cur.execute(
                f"UPDATE {SCHEMA}.users SET password_hash = '{pw_hash}' WHERE id = {row[0]}"
            )
            conn.commit()

            return {
                "statusCode": 200,
                "headers": CORS,
                "body": json.dumps({"token": f"{row[0]}:{pw_hash}", "user": {"id": row[0], "name": row[1], "email": row[2], "is_admin": row[3]}}),
            }

        # --- /me (проверка токена) ---
        if path.endswith("/me") and method == "GET":
            auth = event.get("headers", {}).get("X-Session-Id", "")
            if not auth or ":" not in auth:
                return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Не авторизован"})}

            parts = auth.split(":", 1)
            user_id, pw_hash = parts[0], parts[1]
            cur.execute(
                f"SELECT id, name, email, is_admin FROM {SCHEMA}.users WHERE id = {user_id} AND password_hash = '{pw_hash}'"
            )
            row = cur.fetchone()
            if not row:
                return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Сессия недействительна"})}

            return {
                "statusCode": 200,
                "headers": CORS,
                "body": json.dumps({"user": {"id": row[0], "name": row[1], "email": row[2], "is_admin": row[3]}}),
            }

        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Not found"})}

    finally:
        cur.close()
        conn.close()