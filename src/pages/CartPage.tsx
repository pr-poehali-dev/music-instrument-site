import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ADDRESSES } from '@/data/users';
import Icon from '@/components/ui/icon';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, addOrder, currentUser, setPage, orders } = useApp();
  const [address, setAddress] = useState(ADDRESSES[0]);
  const [customAddress, setCustomAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!deliveryDate) errs.deliveryDate = 'Укажите дату доставки';
    else {
      const d = new Date(deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (d <= today) errs.deliveryDate = 'Дата доставки должна быть в будущем';
    }
    const addr = address === '__custom__' ? customAddress : address;
    if (!addr.trim()) errs.address = 'Укажите адрес доставки';
    return errs;
  };

  const handleOrder = () => {
    if (!currentUser) { setPage('login'); return; }
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const addr = address === '__custom__' ? customAddress : address;
    addOrder({
      userId: currentUser.id,
      userName: currentUser.fullName,
      items: [...cart],
      total,
      status: 'Новая',
      address: addr,
      createdAt: new Date().toISOString().split('T')[0],
      deliveryDate,
    });
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">Заказ оформлен!</h2>
        <p className="text-muted-foreground mb-6">Ваш заказ принят и будет доставлен в указанную дату.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setPage('orders')} className="bg-foreground text-white px-6 py-2.5 rounded-md font-medium">
            Мои заказы
          </button>
          <button onClick={() => { setSuccess(false); setPage('catalog'); }} className="border border-border px-6 py-2.5 rounded-md font-medium">
            Продолжить покупки
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
        <button onClick={() => setPage('catalog')} className="bg-foreground text-white px-6 py-2.5 rounded-md font-medium">
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(item => (
            <div key={item.product.id} className="bg-white border border-border rounded-lg p-4 flex gap-4 items-center">
              <div className="w-16 h-16 bg-secondary rounded-md flex items-center justify-center text-3xl shrink-0">
                {item.product.category === 'Струнные' ? '🎸' : item.product.category === 'Клавишные' ? '🎹' : item.product.category === 'Духовые' ? '🎺' : item.product.category === 'Ударные' ? '🥁' : '🎵'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground">{item.product.article} · {item.product.manufacturer}</p>
                <p className="font-bold mt-1">{item.product.price.toLocaleString('ru')} ₽</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                  className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon name="Plus" size={14} />
                </button>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="ml-2 text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1">
            <Icon name="Trash2" size={14} /> Очистить корзину
          </button>
        </div>

        {/* Order form */}
        <div className="bg-white border border-border rounded-lg p-5 h-fit">
          <h2 className="font-bold text-lg mb-4">Оформление заказа</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Адрес доставки</label>
              <select
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              >
                {ADDRESSES.map(a => <option key={a} value={a}>{a}</option>)}
                <option value="__custom__">Другой адрес...</option>
              </select>
              {address === '__custom__' && (
                <input
                  value={customAddress}
                  onChange={e => setCustomAddress(e.target.value)}
                  placeholder="Введите адрес"
                  className="mt-2 w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-foreground"
                />
              )}
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Дата доставки</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={e => setDeliveryDate(e.target.value)}
                min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-foreground"
              />
              {errors.deliveryDate && <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Товаров: {cart.reduce((s, i) => s + i.quantity, 0)} шт</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Итого:</span>
                <span>{total.toLocaleString('ru')} ₽</span>
              </div>
            </div>

            {!currentUser && (
              <p className="text-sm text-amber-600 bg-amber-50 rounded-md p-2">
                Для оформления заказа необходимо <button onClick={() => setPage('login')} className="underline font-medium">войти</button>
              </p>
            )}

            <button
              onClick={handleOrder}
              className="w-full bg-foreground text-white py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
