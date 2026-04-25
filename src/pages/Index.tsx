import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const CATALOG_ITEMS = [
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
];

const STEPS = [
  { icon: "User", title: "Введи мерки", desc: "Рост, обхват груди, талии, бёдер" },
  { icon: "Camera", title: "Загрузи фото", desc: "Фото в полный рост на светлом фоне" },
  { icon: "Shirt", title: "Выбери модель", desc: "Выбери из каталога понравившуюся вещь" },
  { icon: "Sparkles", title: "Посмотри результат", desc: "Модель масштабируется под твой рост" },
];

const ORDERS = [
  { id: "#ORD-0421", item: "Платье «Аврора»", date: "18 апр 2026", status: "Доставляется", color: "text-purple-400" },
  { id: "#ORD-0387", item: "Жакет «Урбан»", date: "2 апр 2026", status: "Получен", color: "text-green-400" },
  { id: "#ORD-0301", item: "Образ «Минимал»", date: "15 мар 2026", status: "Получен", color: "text-green-400" },
];

type Section = "catalog" | "tryon" | "measures" | "cabinet" | "process" | "contacts";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("catalog");
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [height, setHeight] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const navItems: { key: Section; label: string; icon: string }[] = [
    { key: "catalog", label: "Каталог", icon: "LayoutGrid" },
    { key: "tryon", label: "Примерка", icon: "Shirt" },
    { key: "measures", label: "Мерки", icon: "Ruler" },
    { key: "cabinet", label: "Кабинет", icon: "User" },
    { key: "process", label: "Как это работает", icon: "Info" },
    { key: "contacts", label: "Контакты", icon: "MessageCircle" },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUserPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const getScalePercent = () => {
    if (!height || isNaN(Number(height))) return 100;
    const base = 170;
    return Math.round((Number(height) / base) * 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-pink-500/15 blur-[80px]" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-orange-500/10 blur-[90px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg grad-bg flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-display font-bold text-sm">D</span>
            </div>
            <span className="font-display text-xl font-bold tracking-widest grad-text">DRAPE</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === item.key
                    ? "grad-bg text-white shadow-lg shadow-purple-500/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden glass-card p-2 rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} className="text-white" />
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.key
                    ? "grad-bg text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">

        {/* ========== CATALOG ========== */}
        {activeSection === "catalog" && (
          <div className="animate-fade-in-1">
            {/* Hero */}
            <div className="relative rounded-3xl overflow-hidden mb-10 min-h-[280px] flex items-center grad-bg p-8 md:p-12">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)" }}
              />
              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4 text-white/90 text-sm font-medium backdrop-blur-sm">
                  <Icon name="Sparkles" size={14} />
                  Виртуальная примерочная
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                  ПРИМЕРЬ<br />ДО ПОКУПКИ
                </h1>
                <p className="text-white/80 text-lg mb-6">
                  Загрузи своё фото и посмотри, как вещь сидит именно на тебе — с учётом твоего роста
                </p>
                <button
                  onClick={() => setActiveSection("tryon")}
                  className="bg-white text-purple-700 font-display font-semibold px-6 py-3 rounded-2xl text-sm tracking-wider hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
                >
                  ПОПРОБОВАТЬ
                </button>
              </div>
              <div className="hidden md:block absolute right-8 bottom-0 w-56 h-56 animate-float opacity-80">
                <img src={CATALOG_ITEMS[0].img} alt="" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex gap-3 mb-6 flex-wrap">
              {["Все", "Вечернее", "Повседневное", "Базовое", "Новинки"].map((f) => (
                <button key={f} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${f === "Все" ? "grad-bg text-white" : "glass-card text-white/60 hover:text-white hover:border-white/20"}`}>
                  {f}
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATALOG_ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  className={`glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer animate-fade-in-${i + 2} ${selectedModel === item.id ? "ring-2 ring-purple-500" : ""}`}
                  onClick={() => setSelectedModel(item.id)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${item.tagColor} text-white text-xs font-display font-semibold px-3 py-1 rounded-full`}>
                      {item.tag}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedModel(item.id); setActiveSection("tryon"); }}
                      className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 hover:bg-purple-600 transition-colors"
                    >
                      <Icon name="Shirt" size={12} />
                      Примерить
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">{item.category}</p>
                        <h3 className="font-display text-lg font-semibold text-white">{item.name}</h3>
                      </div>
                      <span className="grad-text font-display font-bold text-lg">{item.price}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {item.sizes.map((s) => (
                        <span key={s} className="text-xs border border-white/15 text-white/50 px-2.5 py-1 rounded-lg hover:border-purple-500 hover:text-purple-400 transition-colors cursor-pointer">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== TRY-ON ========== */}
        {activeSection === "tryon" && (
          <div className="animate-fade-in-1">
            <div className="mb-8">
              <h2 className="font-display text-4xl font-bold grad-text mb-2">ПРИМЕРОЧНАЯ</h2>
              <p className="text-white/50">Загрузи фото и выбери модель — масштаб подстроится под твой рост</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Photo upload */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Icon name="Camera" size={20} className="text-purple-400" />
                  Твоё фото
                </h3>
                {userPhoto ? (
                  <div className="relative">
                    <img src={userPhoto} alt="Ваше фото" className="w-full h-72 object-cover rounded-xl" />
                    <button
                      onClick={() => setUserPhoto(null)}
                      className="absolute top-3 right-3 bg-black/60 p-2 rounded-xl hover:bg-red-500/80 transition-colors"
                    >
                      <Icon name="X" size={14} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-white/15 rounded-xl h-72 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon name="Upload" size={24} className="text-purple-400" />
                    </div>
                    <p className="text-white/60 text-sm text-center px-4">
                      Нажми чтобы загрузить фото<br />
                      <span className="text-white/30 text-xs">JPG или PNG, фото в полный рост</span>
                    </p>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-white/50 text-xs mb-1 block">Твой рост (см)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="170"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  {height && (
                    <div className="mt-5 glass-card rounded-xl px-4 py-2.5 text-center">
                      <p className="text-xs text-white/40">Масштаб</p>
                      <p className="font-display font-bold grad-text text-lg">{getScalePercent()}%</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Model selection */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Icon name="Shirt" size={20} className="text-pink-400" />
                  Модель одежды
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {CATALOG_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedModel(item.id)}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${selectedModel === item.id ? "border-purple-500 glow-purple" : "border-transparent"}`}
                    >
                      <img src={item.img} alt={item.name} className="w-full h-28 object-cover" />
                      <div className="p-1.5 bg-white/5">
                        <p className="text-white/70 text-xs truncate">{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Result preview */}
                {userPhoto && selectedModel ? (
                  <div className="relative rounded-xl overflow-hidden h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-white/10">
                    <img src={userPhoto} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={CATALOG_ITEMS.find(c => c.id === selectedModel)?.img}
                        alt=""
                        className="object-contain opacity-80 transition-all duration-500"
                        style={{ height: `${Math.min(getScalePercent(), 120)}%`, maxHeight: "100%" }}
                      />
                    </div>
                    <div className="absolute bottom-3 left-3 glass-card rounded-lg px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
                      <Icon name="Sparkles" size={10} className="inline mr-1 text-purple-400" />
                      Примерка: {CATALOG_ITEMS.find(c => c.id === selectedModel)?.name}
                    </div>
                  </div>
                ) : (
                  <div className="h-48 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/30 text-sm gap-2">
                    <Icon name="ImagePlus" size={28} />
                    <p>Загрузи фото и выбери модель</p>
                  </div>
                )}
              </div>
            </div>

            {userPhoto && selectedModel && (
              <div className="mt-6 flex justify-end">
                <button className="grad-bg text-white font-display font-semibold px-8 py-3 rounded-2xl tracking-wider hover:opacity-90 transition-all hover:scale-105 glow-purple">
                  ОФОРМИТЬ ЗАКАЗ
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========== MEASURES ========== */}
        {activeSection === "measures" && (
          <div className="animate-fade-in-1 max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="font-display text-4xl font-bold grad-text mb-2">МОИ МЕРКИ</h2>
              <p className="text-white/50">Введи точные мерки — система подберёт подходящий размер</p>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Рост", unit: "см", val: height, set: setHeight, icon: "ArrowUpDown", hint: "напр. 170" },
                  { label: "Обхват груди", unit: "см", val: chest, set: setChest, icon: "Heart", hint: "напр. 88" },
                  { label: "Обхват талии", unit: "см", val: waist, set: setWaist, icon: "CircleDashed", hint: "напр. 68" },
                  { label: "Обхват бёдер", unit: "см", val: hips, set: setHips, icon: "Maximize2", hint: "напр. 96" },
                ].map((field) => (
                  <div key={field.label} className="col-span-2 sm:col-span-1">
                    <label className="flex items-center gap-1.5 text-white/60 text-sm mb-2">
                      <Icon name={field.icon} size={14} className="text-purple-400" />
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={field.val}
                        onChange={(e) => field.set(e.target.value)}
                        placeholder={field.hint}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 pr-12 transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">{field.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Size recommendation */}
              {chest && (
                <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4 mb-4">
                  <p className="text-white/60 text-xs mb-1">Рекомендуемый размер</p>
                  <p className="font-display text-3xl font-bold grad-text">
                    {Number(chest) < 84 ? "XS" : Number(chest) < 88 ? "S" : Number(chest) < 96 ? "M" : Number(chest) < 104 ? "L" : "XL"}
                  </p>
                  <p className="text-white/40 text-xs mt-1">на основании обхвата груди {chest} см</p>
                </div>
              )}

              <button className="w-full grad-bg text-white font-display font-semibold py-3 rounded-2xl tracking-wider hover:opacity-90 transition-all hover:scale-[1.02] glow-purple">
                СОХРАНИТЬ МЕРКИ
              </button>
            </div>

            <div className="mt-6 glass-card rounded-2xl p-5">
              <h4 className="font-display font-semibold text-white mb-3 flex items-center gap-2">
                <Icon name="HelpCircle" size={16} className="text-orange-400" />
                Как правильно снять мерки
              </h4>
              <ul className="space-y-2 text-sm text-white/55">
                <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">→</span> Стой прямо, дыши свободно</li>
                <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">→</span> Сантиметр должен плотно прилегать, но не давить</li>
                <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">→</span> Обхват груди — по выступающим точкам</li>
                <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">→</span> Обхват бёдер — через самые широкие точки</li>
              </ul>
            </div>
          </div>
        )}

        {/* ========== CABINET ========== */}
        {activeSection === "cabinet" && (
          <div className="animate-fade-in-1">
            <div className="mb-8">
              <h2 className="font-display text-4xl font-bold grad-text mb-2">ЛИЧНЫЙ КАБИНЕТ</h2>
              <p className="text-white/50">Твои заказы и история покупок</p>
            </div>

            {/* Profile card */}
            <div className="glass-card rounded-2xl p-6 mb-6 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl grad-bg flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                <Icon name="User" size={28} className="text-white" />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-white">Анна Соколова</p>
                <p className="text-white/50 text-sm">anna@example.com</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs text-purple-400">3 заказа</span>
                  <span className="text-xs text-white/30">|</span>
                  <span className="text-xs text-pink-400">Размер M</span>
                  <span className="text-xs text-white/30">|</span>
                  <span className="text-xs text-orange-400">Рост 167 см</span>
                </div>
              </div>
              <button className="ml-auto glass-card px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white transition-colors">
                Редактировать
              </button>
            </div>

            {/* Orders */}
            <h3 className="font-display text-xl font-semibold text-white mb-4">История заказов</h3>
            <div className="space-y-3">
              {ORDERS.map((order, i) => (
                <div key={order.id} className={`glass-card rounded-2xl p-5 flex items-center justify-between animate-fade-in-${i + 2} hover-lift`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Icon name="Package" size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{order.item}</p>
                      <p className="text-white/40 text-sm">{order.id} · {order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${order.color}`}>{order.status}</span>
                    <Icon name="ChevronRight" size={16} className="text-white/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== PROCESS ========== */}
        {activeSection === "process" && (
          <div className="animate-fade-in-1">
            <div className="mb-10">
              <h2 className="font-display text-4xl font-bold grad-text mb-2">КАК ЭТО РАБОТАЕТ</h2>
              <p className="text-white/50">Четыре шага до идеальной покупки</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {STEPS.map((step, i) => (
                <div key={i} className={`glass-card rounded-2xl p-6 hover-lift animate-fade-in-${i + 2}`}>
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl grad-bg flex items-center justify-center flex-shrink-0">
                      <Icon name={step.icon} size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-display text-white/20 text-3xl font-bold leading-none">0{i + 1}</span>
                        <h3 className="font-display text-xl font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rules */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold text-white mb-5 flex items-center gap-2">
                <Icon name="FileText" size={20} className="text-pink-400" />
                Правила примерки
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white/60 leading-relaxed">
                <div className="space-y-3">
                  <p className="flex items-start gap-2"><span className="text-purple-400">✦</span> Используй фото в полный рост на однотонном фоне</p>
                  <p className="flex items-start gap-2"><span className="text-pink-400">✦</span> Стой прямо, руки вдоль тела, ноги вместе</p>
                  <p className="flex items-start gap-2"><span className="text-orange-400">✦</span> Хорошее равномерное освещение улучшает точность</p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-start gap-2"><span className="text-purple-400">✦</span> Введи точный рост для корректного масштабирования</p>
                  <p className="flex items-start gap-2"><span className="text-pink-400">✦</span> Результат примерки — визуализация, не гарантия посадки</p>
                  <p className="flex items-start gap-2"><span className="text-orange-400">✦</span> При сомнениях — закажи два размера, ненужный вернём</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== CONTACTS ========== */}
        {activeSection === "contacts" && (
          <div className="animate-fade-in-1 max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="font-display text-4xl font-bold grad-text mb-2">КОНТАКТЫ</h2>
              <p className="text-white/50">Ответим в течение двух часов</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: "MessageCircle", title: "Telegram", val: "@drape_support", color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5" },
                { icon: "Mail", title: "Email", val: "hello@drape.ru", color: "text-pink-400", bg: "from-pink-500/10 to-pink-500/5" },
                { icon: "Phone", title: "Телефон", val: "+7 (800) 555-35-35", color: "text-orange-400", bg: "from-orange-500/10 to-orange-500/5" },
              ].map((c, i) => (
                <div key={i} className={`glass-card rounded-2xl p-5 bg-gradient-to-br ${c.bg} hover-lift animate-fade-in-${i + 2}`}>
                  <Icon name={c.icon} size={24} className={`${c.color} mb-3`} />
                  <p className="text-white/40 text-xs mb-1">{c.title}</p>
                  <p className="text-white font-medium text-sm">{c.val}</p>
                </div>
              ))}
            </div>

            {/* Support form */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-xl font-semibold text-white mb-5">Написать в поддержку</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs mb-1.5 block">Имя</label>
                    <input type="text" placeholder="Анна" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1.5 block">Email</label>
                    <input type="email" placeholder="your@email.ru" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Сообщение</label>
                  <textarea
                    placeholder="Опиши свой вопрос..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>
                <button className="w-full grad-bg text-white font-display font-semibold py-3 rounded-2xl tracking-wider hover:opacity-90 transition-all hover:scale-[1.02] glow-purple">
                  ОТПРАВИТЬ
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold grad-text text-lg">DRAPE</span>
            <span>— Виртуальная примерочная</span>
          </div>
          <p>© 2026 DRAPE. Все права защищены</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">Условия</a>
            <a href="#" className="hover:text-white/60 transition-colors">Конфиденциальность</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
