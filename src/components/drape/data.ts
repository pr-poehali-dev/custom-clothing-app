export type Section = "catalog" | "tryon" | "measures" | "cabinet" | "process" | "contacts";

export const CATALOG_ITEMS = [
  {
    id: 1,
    name: "Платье «Аврора»",
    category: "Вечернее",
    price: "12 400 ₽",
    sizes: ["XS", "S", "M", "L"],
    img: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/aa40813b-c6c5-447f-b035-c668c1ac9013.jpg",
    images: [
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/aa40813b-c6c5-447f-b035-c668c1ac9013.jpg", label: "Спереди" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/5552b5d0-fc54-4794-9da7-8024306c2ca7.jpg", label: "Сзади" },
    ],
    description: "Вечернее платье из струящегося шёлка с мягким блеском. Приталенный силуэт подчёркивает фигуру, нежная расцветка Aurora переливается в свете. Потайная молния сзади, подкладка из вискозы. Идеально для торжественных выходов.",
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
    images: [
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/710e29d3-14c0-4c00-af33-25bc81bea951.jpg", label: "Спереди" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/da7dddac-31c2-448e-85b3-264e68deaefa.jpg", label: "Сзади" },
    ],
    description: "Структурированный жакет для городского ритма. Плотная костюмная ткань держит форму весь день. Прямой крой, накладные карманы, пуговицы на манжетах. Сочетается с брюками, юбкой и джинсами — универсальная основа гардероба.",
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
    images: [
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/a38b6035-f804-4c83-9797-b4ebbdd01734.jpg", label: "Спереди" },
      { url: "https://cdn.poehali.dev/projects/e58f668d-5825-4761-bbb4-0fcd148af2a0/files/590b9aed-65f9-4afc-af06-2093b200c11d.jpg", label: "Сзади" },
    ],
    description: "Базовый комплект в духе капсульного гардероба. Лёгкий льняной верх и широкие брюки свободного кроя из хлопка. Нейтральная палитра позволяет сочетать с любыми акцентами. Состав: лён 60%, хлопок 40%.",
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
    description: "Авторский жакет из костюмной шерсти с выраженной талией и пышным подолом. Без воротника, застёжка на 5 тёмных пуговиц. Рельефные швы создают скульптурный силуэт. Состав: шерсть 80%, полиэстер 20%. Сухая чистка.",
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
    description: "Футболка из мягкой искусственной замши глубокого чёрного цвета. По низу — декоративная кулиска со шнурком, позволяет регулировать длину и силуэт. Крой оверсайз, круглый вырез. Состав: полиэстер 95%, эластан 5%. Стирка при 30°.",
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