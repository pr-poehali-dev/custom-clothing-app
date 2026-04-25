export type Section = "catalog" | "tryon" | "measures" | "cabinet" | "process" | "contacts";

export const CATALOG_ITEMS = [
  {
    id: 1,
    name: "Платье «Аврора»",
    category: "Вечернее",
    price: "12 400 ₽",
    sizes: ["XS", "S", "M", "L"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/ab0e3ee6-d05e-458b-a80a-a14129d7b1b8.jpg",
    images: [
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/ab0e3ee6-d05e-458b-a80a-a14129d7b1b8.jpg", label: "Спереди" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/5552b5d0-fc54-4794-9da7-8024306c2ca7.jpg", label: "Сзади" },
    ],
    tag: "Хит",
    tagColor: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "Жакет «Урбан»",
    category: "Повседневное",
    price: "8 900 ₽",
    sizes: ["S", "M", "L", "XL"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/7c93b456-03d0-42af-9f73-4185d455b99d.jpg",
    images: [
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/7c93b456-03d0-42af-9f73-4185d455b99d.jpg", label: "Спереди" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/da7dddac-31c2-448e-85b3-264e68deaefa.jpg", label: "Сзади" },
    ],
    tag: "Новинка",
    tagColor: "from-orange-500 to-pink-500",
  },
  {
    id: 3,
    name: "Образ «Минимал»",
    category: "Базовый",
    price: "6 200 ₽",
    sizes: ["XS", "S", "M"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/564a837a-4db3-4950-bc80-049e19e4c70c.jpg",
    images: [
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/564a837a-4db3-4950-bc80-049e19e4c70c.jpg", label: "Спереди" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/590b9aed-65f9-4afc-af06-2093b200c11d.jpg", label: "Сзади" },
    ],
    tag: "−20%",
    tagColor: "from-pink-500 to-orange-500",
  },
  {
    id: 4,
    name: "Жакет BRONNI-fitted",
    category: "Повседневное",
    price: "14 900 ₽",
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/972abfa5-dae1-4595-b676-918db4e8f2c4.jpg",
    images: [
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/972abfa5-dae1-4595-b676-918db4e8f2c4.jpg", label: "Спереди" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/7e3d2775-3c45-4c88-9b9a-f0d7d29438c1.jpg", label: "Сзади" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/238e1ca4-2acb-44d5-b62e-0e19d4536b98.jpg", label: "На модели" },
    ],
    tag: "Новинка",
    tagColor: "from-amber-600 to-stone-500",
  },
  {
    id: 5,
    name: "Футболка замша с кулиской",
    category: "Повседневное",
    price: "7 800 ₽",
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/a3dc4ab2-576a-441b-9f9d-d2d381d5f708.jpg",
    images: [
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/a3dc4ab2-576a-441b-9f9d-d2d381d5f708.jpg", label: "Спереди" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/d328593d-bfdb-4e2f-b28a-6262b4df296d.jpg", label: "Сзади" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/0d43e105-22b7-4ea0-9283-182d2baea5ad.jpg", label: "На модели" },
    ],
    tag: "Новинка",
    tagColor: "from-zinc-600 to-neutral-800",
  },
];

export const STEPS = [
  { icon: "User", title: "Введи мерки", desc: "Рост, обхват груди, талии, бёдер" },
  { icon: "Camera", title: "Загрузи фото", desc: "Фото в полный рост на светлом фоне" },
  { icon: "Shirt", title: "Выбери модель", desc: "Выбери из каталога понравившуюся вещь" },
  { icon: "Sparkles", title: "Посмотри результат", desc: "Модель масштабируется под твой рост" },
];

export const ORDERS = [
  { id: "#ORD-0421", item: "Платье «Аврора»", date: "18 апр 2026", status: "Доставляется", color: "text-purple-400" },
  { id: "#ORD-0387", item: "Жакет «Урбан»", date: "2 апр 2026", status: "Получен", color: "text-green-400" },
  { id: "#ORD-0301", item: "Образ «Минимал»", date: "15 мар 2026", status: "Получен", color: "text-green-400" },
];

export const NAV_ITEMS: { key: Section; label: string; icon: string }[] = [
  { key: "catalog", label: "Каталог", icon: "LayoutGrid" },
  { key: "tryon", label: "Примерка", icon: "Shirt" },
  { key: "measures", label: "Мерки", icon: "Ruler" },
  { key: "cabinet", label: "Кабинет", icon: "User" },
  { key: "process", label: "Как это работает", icon: "Info" },
  { key: "contacts", label: "Контакты", icon: "MessageCircle" },
];