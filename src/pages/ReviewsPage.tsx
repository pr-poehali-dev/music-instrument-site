import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

function Stars({ rating, onSelect }: { rating: number; onSelect?: (r: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          onClick={() => onSelect?.(i)}
          className={`text-xl ${i <= rating ? 'text-gold' : 'text-muted-foreground/30'} ${onSelect ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const { reviews, currentUser, orders, addReview, setPage } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const completedOrders = currentUser
    ? orders.filter(o =>
        o.userId === currentUser.id &&
        o.status === 'Завершено' &&
        !reviews.some(r => r.orderId === o.id && r.userId === currentUser.id)
      )
    : [];

  const handleSubmit = () => {
    if (!text.trim() || text.length < 10) { setError('Напишите отзыв (минимум 10 символов)'); return; }
    if (!productName.trim()) { setError('Укажите название товара'); return; }
    if (!currentUser) { setPage('login'); return; }

    addReview({
      userId: currentUser.id,
      userName: currentUser.fullName,
      orderId: selectedOrderId,
      productName,
      rating,
      text: text.trim(),
    });

    setText(''); setProductName(''); setRating(5); setSelectedOrderId('');
    setShowForm(false); setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Отзывы</h1>
          <p className="text-muted-foreground">Покупатели о наших инструментах</p>
        </div>
        {currentUser && completedOrders.length > 0 && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-foreground text-white px-4 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            + Оставить отзыв
          </button>
        )}
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-3 mb-6 text-sm">
          ✅ Спасибо за отзыв! Он уже опубликован.
        </div>
      )}

      {/* Review form */}
      {showForm && currentUser && (
        <div className="bg-white border border-border rounded-lg p-5 mb-8">
          <h2 className="font-bold text-lg mb-4">Новый отзыв</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Завершённый заказ</label>
              <select
                value={selectedOrderId}
                onChange={e => {
                  setSelectedOrderId(e.target.value);
                  const order = completedOrders.find(o => o.id === e.target.value);
                  if (order) setProductName(order.items[0]?.product.name || '');
                }}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              >
                <option value="">Выберите заказ</option>
                {completedOrders.map(o => (
                  <option key={o.id} value={o.id}>#{o.orderNumber} — {o.items[0]?.product.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Товар</label>
              <input
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="Название инструмента"
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Оценка</label>
              <Stars rating={rating} onSelect={setRating} />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Отзыв</label>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Поделитесь впечатлениями об инструменте..."
                rows={4}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-foreground resize-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button onClick={handleSubmit} className="bg-foreground text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                Опубликовать
              </button>
              <button onClick={() => { setShowForm(false); setError(''); }} className="border border-border px-5 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">💬</div>
          <p className="text-muted-foreground">Пока отзывов нет. Будьте первым!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="bg-white border border-border rounded-lg p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-sm">{r.userName}</p>
                  <p className="text-xs text-muted-foreground">{r.productName} · {r.createdAt}</p>
                </div>
                <Stars rating={r.rating} />
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
