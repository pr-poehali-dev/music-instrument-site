import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

const STATUS_STYLES: Record<string, string> = {
  'Новая': 'bg-blue-50 text-blue-700',
  'В обработке': 'bg-amber-50 text-amber-700',
  'Идет обучение': 'bg-purple-50 text-purple-700',
  'Завершено': 'bg-green-50 text-green-700',
  'Отменен': 'bg-red-50 text-red-600',
};

export default function OrdersPage() {
  const { currentUser, orders, setPage, addReview, reviews } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-2xl font-bold mb-2">Необходима авторизация</h2>
        <p className="text-muted-foreground mb-6">Войдите, чтобы просматривать свои заказы</p>
        <button onClick={() => setPage('login')} className="bg-foreground text-white px-6 py-2.5 rounded-md font-medium">
          Войти
        </button>
      </div>
    );
  }

  const userOrders = currentUser.role === 'admin' || currentUser.role === 'manager'
    ? orders
    : orders.filter(o => o.userId === currentUser.id);

  const canReview = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    const alreadyReviewed = reviews.some(r => r.orderId === orderId && r.userId === currentUser.id);
    return order?.status === 'Завершено' && !alreadyReviewed;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">
        {currentUser.role === 'client' ? 'Мои заказы' : 'Все заказы'}
      </h1>
      <p className="text-muted-foreground mb-8">Всего: {userOrders.length} заказов</p>

      {userOrders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-muted-foreground mb-4">У вас ещё нет заказов</p>
          <button onClick={() => setPage('catalog')} className="bg-foreground text-white px-6 py-2.5 rounded-md font-medium">
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map(order => (
            <div key={order.id} className="bg-white border border-border rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold">Заказ #{order.orderNumber}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[order.status] || 'bg-secondary text-foreground'}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{order.userName}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-bold text-lg">{order.total.toLocaleString('ru')} ₽</p>
                  <p className="text-muted-foreground">от {order.createdAt}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.product.name} × {item.quantity}</span>
                    <span>{(item.product.price * item.quantity).toLocaleString('ru')} ₽</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p className="flex items-center gap-1"><Icon name="MapPin" size={12} /> {order.address}</p>
                  <p className="flex items-center gap-1"><Icon name="Calendar" size={12} /> Доставка: {order.deliveryDate}</p>
                  <p className="flex items-center gap-1"><Icon name="Hash" size={12} /> Код получения: {order.receiptCode}</p>
                </div>
                {canReview(order.id) && (
                  <button
                    onClick={() => setPage(`review:${order.id}`)}
                    className="text-sm border border-border px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                  >
                    Оставить отзыв
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
