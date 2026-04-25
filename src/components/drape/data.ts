export type Section = "catalog" | "tryon" | "measures" | "cabinet" | "process" | "contacts";

export const CATALOG_ITEMS = [
  {
    id: 1,
    name: "Платье «Аврора»",
    category: "Вечернее",
    price: "12 400 ₽",
    sizes: ["XS", "S", "M", "L"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/aa40813b-c6c5-447f-b035-c668c1ac9013.jpg",
    tag: "Хит",
    tagColor: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "Жакет «Урбан»",
    category: "Повседневное",
    price: "8 900 ₽",
    sizes: ["S", "M", "L", "XL"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/710e29d3-14c0-4c00-af33-25bc81bea951.jpg",
    tag: "Новинка",
    tagColor: "from-orange-500 to-pink-500",
  },
  {
    id: 3,
    name: "Образ «Минимал»",
    category: "Базовый",
    price: "6 200 ₽",
    sizes: ["XS", "S", "M"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/a38b6035-f804-4c83-9797-b4ebbdd01734.jpg",
    tag: "−20%",
    tagColor: "from-pink-500 to-orange-500",
  },
  {
    id: 4,
    name: "Жакет BRONNI-fitted",
    category: "Повседневное",
    price: "14 900 ₽",
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/238e1ca4-2acb-44d5-b62e-0e19d4536b98.jpg",
    tag: "Новинка",
    tagColor: "from-amber-600 to-stone-500",
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