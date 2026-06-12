import { useState } from 'react';
import { useApp, OrderStatus } from '@/context/AppContext';
import { PRODUCTS } from '@/data/products';
import Icon from '@/components/ui/icon';

const ALL_STATUSES: OrderStatus[] = ['Новая', 'В обработке', 'Идет обучение', 'Завершено', 'Отменен'];

const STATUS_STYLES: Record<string, string> = {
  'Новая': 'bg-blue-50 text-blue-700 border-blue-200',
  'В обработке': 'bg-amber-50 text-amber-700 border-amber-200',
  'Идет обучение': 'bg-purple-50 text-purple-700 border-purple-200',
  'Завершено': 'bg-green-50 text-green-700 border-green-200',
  'Отменен': 'bg-red-50 text-red-600 border-red-200',
};

export default function AdminPage() {
  const { currentUser, orders, updateOrderStatus, reviews, setPage } = useApp();
  const [tab, setTab] = useState<'orders' | 'products' | 'reviews'>('orders');
  const [filterStatus, setFilterStatus] = useState<string>('Все');
  const [search, setSearch] = useState('');

  if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'manager')) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="text-5xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold mb-2">Доступ запрещён</h2>
        <p className="text-muted-foreground mb-6">Эта страница только для администраторов</p>
        <button onClick={() => setPage('login')} className="bg-foreground text-white px-6 py-2.5 rounded-md font-medium">
          Войти
        </button>
      </div>
    );
  }

  const filteredOrders = orders
    .filter(o => filterStatus === 'Все' || o.status === filterStatus)
    .filter(o => !search || o.userName.toLowerCase().includes(search.toLowerCase()) || o.orderNumber.toLowerCase().includes(search.toLowerCase()));

  const stats = {
    total: orders.length,
    new: orders.filter(o => o.status === 'Новая').length,
    active: orders.filter(o => o.status === 'В обработке' || o.status === 'Идет обучение').length,
    done: orders.filter(o => o.status === 'Завершено').length,
    revenue: orders.filter(o => o.status === 'Завершено').reduce((s, o) => s + o.total, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Административная панель</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Привет, {currentUser.fullName} · {currentUser.role === 'admin' ? 'Администратор' : 'Менеджер'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Всего заказов', value: stats.total, icon: 'ShoppingBag' },
          { label: 'Новых', value: stats.new, icon: 'Bell' },
          { label: 'В работе', value: stats.active, icon: 'Clock' },
          { label: 'Выручка', value: `${stats.revenue.toLocaleString('ru')} ₽`, icon: 'TrendingUp' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <Icon name={s.icon} size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {(['orders', 'products', 'reviews'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'orders' ? `Заказы (${orders.length})` : t === 'products' ? `Товары (${PRODUCTS.length})` : `Отзывы (${reviews.length})`}
          </button>
        ))}
      </div>

      {/* ORDERS TAB */}
      {tab === 'orders' && (
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск по клиенту или номеру..."
                className="w-full pl-8 pr-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-foreground"
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none bg-white"
            >
              <option>Все</option>
              {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Заказ</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Клиент</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Дата</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Сумма</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Статус</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium">#{order.orderNumber}</div>
                        <div className="text-xs text-muted-foreground">{order.receiptCode}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{order.userName}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[160px]">{order.address}</div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{order.createdAt}</td>
                      <td className="px-4 py-3 hidden md:table-cell font-medium">{order.total.toLocaleString('ru')} ₽</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_STYLES[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="border border-border rounded px-2 py-1 text-xs focus:outline-none bg-white"
                        >
                          {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">Заказов не найдено</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {tab === 'products' && (
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Артикул</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Наименование</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Категория</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Производитель</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Цена</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Остаток</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Статус</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map(p => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{p.article}</td>
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{p.manufacturer}</td>
                    <td className="px-4 py-3 text-right font-medium">{p.price.toLocaleString('ru')} ₽</td>
                    <td className="px-4 py-3 text-right">
                      <span className={p.stock > 5 ? 'text-green-600' : p.stock > 0 ? 'text-amber-600' : 'text-red-500'}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? 'bg-green-50 text-green-700' : 'bg-secondary text-muted-foreground'}`}>
                        {p.isActive ? 'Активен' : 'Неактивен'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REVIEWS TAB */}
      {tab === 'reviews' && (
        <div className="space-y-4">
          {reviews.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">Отзывов пока нет</div>
          )}
          {reviews.map(r => (
            <div key={r.id} className="bg-white border border-border rounded-lg p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="font-semibold text-sm">{r.userName}</span>
                  <span className="text-muted-foreground text-xs ml-2">· {r.productName}</span>
                </div>
                <div className="flex items-center gap-1 text-gold text-sm shrink-0">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  <span className="text-muted-foreground ml-1">{r.createdAt}</span>
                </div>
              </div>
              <p className="text-sm text-foreground/80">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}