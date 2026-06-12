import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, CATEGORIES, Product } from '@/data/products';
import Icon from '@/components/ui/icon';

const SLIDES = [
  {
    title: 'Музыка начинается здесь',
    subtitle: 'Гитары, пианино, духовые и всё для музыканта',
    bg: 'from-stone-900 to-stone-700',
    emoji: '🎸',
  },
  {
    title: 'Струнные инструменты',
    subtitle: 'Гитары Yamaha, Fender, Gibson — в наличии',
    bg: 'from-amber-900 to-amber-700',
    emoji: '🎻',
  },
  {
    title: 'Клавишные и синтезаторы',
    subtitle: 'Roland, Korg, Yamaha — лучшие производители',
    bg: 'from-slate-800 to-slate-600',
    emoji: '🎹',
  },
];

function ProductCard({ product }: { product: Product }) {
  const { addToCart, setPage } = useApp();
  const categoryEmoji: Record<string, string> = {
    'Струнные': '🎸', 'Клавишные': '🎹', 'Духовые': '🎺', 'Ударные': '🥁', 'Народные': '🪗', 'Аксессуары': '🎧'
  };

  return (
    <div className="bg-white rounded-lg border border-border hover:border-foreground/20 hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="aspect-square bg-secondary flex items-center justify-center text-5xl">
        {categoryEmoji[product.category] || '🎵'}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{product.article}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-1">{product.manufacturer} · {product.category}</p>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">{product.price.toLocaleString('ru')} ₽</span>
          <span className={`text-xs ${product.stock > 5 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} шт` : 'Нет в наличии'}
          </span>
        </div>
        {product.stock > 0 && (
          <button
            onClick={() => addToCart(product)}
            className="mt-3 w-full bg-foreground text-white text-sm py-2 rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            В корзину
          </button>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { setPage } = useApp();
  const [slide, setSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Все');
  const featured = PRODUCTS.filter(p => p.stock > 0).slice(0, 8);
  const filtered = activeCategory === 'Все' ? featured : featured.filter(p => p.category === activeCategory);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const cur = SLIDES[slide];

  return (
    <div className="animate-fade-in">
      {/* Hero slider */}
      <div className={`relative bg-gradient-to-br ${cur.bg} text-white overflow-hidden transition-all duration-700`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex-1 animate-fade-in" key={slide}>
            <p className="text-white/60 text-sm font-medium mb-3 uppercase tracking-widest">Интернет-магазин</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">{cur.title}</h1>
            <p className="text-white/70 text-lg mb-8">{cur.subtitle}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setPage('catalog')}
                className="bg-white text-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => setPage('register')}
                className="border border-white/40 text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
              >
                Регистрация
              </button>
            </div>
          </div>
          <div className="text-[120px] sm:text-[160px] leading-none select-none opacity-80 animate-fade-in" key={`e${slide}`}>
            {cur.emoji}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === slide ? 'bg-white w-6' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Товаров в каталоге', value: '30+' },
            { label: 'Производителей', value: '6' },
            { label: 'Категорий', value: '6' },
            { label: 'Выполненных заказов', value: '500+' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Популярные товары</h2>
            <p className="text-muted-foreground text-sm mt-1">Лучшие инструменты в наличии</p>
          </div>
          <button
            onClick={() => setPage('catalog')}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            Весь каталог <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-foreground text-white border-foreground'
                  : 'border-border hover:border-foreground/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* Banner */}
      <div className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Станьте клиентом МузыкаПро</h2>
            <p className="text-white/60">Регистрируйтесь и получите доступ к истории заказов и отзывам</p>
          </div>
          <button
            onClick={() => setPage('register')}
            className="bg-gold text-foreground px-8 py-3 rounded-md font-semibold whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="font-bold text-lg mb-1">🎵 МузыкаПро</div>
            <p className="text-sm text-muted-foreground">Интернет-магазин музыкальных инструментов</p>
          </div>
          <div className="text-sm text-muted-foreground">
            г. Лесной · info@muzpro.ru · 8 (800) 123-45-67
          </div>
        </div>
      </footer>
    </div>
  );
}
