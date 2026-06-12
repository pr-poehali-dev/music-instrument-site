import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, CATEGORIES, Product } from '@/data/products';
import Icon from '@/components/ui/icon';

const CATEGORY_EMOJI: Record<string, string> = {
  'Струнные': '🎸', 'Клавишные': '🎹', 'Духовые': '🎺', 'Ударные': '🥁', 'Народные': '🪗', 'Аксессуары': '🎧'
};

export default function CatalogPage() {
  const { addToCart } = useApp();
  const [category, setCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');

  const filtered = PRODUCTS
    .filter(p => category === 'Все' || p.category === category)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.article.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return a.name.localeCompare(b.name, 'ru');
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Каталог</h1>
        <p className="text-muted-foreground">Музыкальные инструменты и аксессуары — {PRODUCTS.length} позиций</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию или артикулу..."
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:border-foreground"
          />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground bg-white"
        >
          <option value="name">По названию</option>
          <option value="price_asc">Цена: по возрастанию</option>
          <option value="price_desc">Цена: по убыванию</option>
        </select>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              category === cat
                ? 'bg-foreground text-white border-foreground'
                : 'border-border hover:border-foreground/40'
            }`}
          >
            {cat === 'Все' ? cat : `${CATEGORY_EMOJI[cat]} ${cat}`}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">Найдено: {filtered.length} товаров</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-lg border border-border hover:shadow-md hover:border-foreground/20 transition-all duration-200">
            <div className="aspect-square bg-secondary flex items-center justify-center text-5xl rounded-t-lg">
              {CATEGORY_EMOJI[p.category] || '🎵'}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start gap-1 mb-1">
                <h3 className="font-semibold text-sm leading-tight">{p.name}</h3>
                <span className="text-xs text-muted-foreground shrink-0">{p.article}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{p.manufacturer} · {p.supplier}</p>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-lg">{p.price.toLocaleString('ru')} ₽</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  p.stock > 5 ? 'bg-green-50 text-green-700' :
                  p.stock > 0 ? 'bg-amber-50 text-amber-700' :
                  'bg-red-50 text-red-600'
                }`}>
                  {p.stock > 0 ? `${p.stock} шт` : 'Нет'}
                </span>
              </div>
              <button
                onClick={() => addToCart(p)}
                disabled={p.stock === 0}
                className="w-full bg-foreground text-white text-sm py-2 rounded-md hover:opacity-90 transition-opacity font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {p.stock > 0 ? 'В корзину' : 'Нет в наличии'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-muted-foreground">Ничего не найдено. Попробуйте изменить фильтры.</p>
        </div>
      )}
    </div>
  );
}
