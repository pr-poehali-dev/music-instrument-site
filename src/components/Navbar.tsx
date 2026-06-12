import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

export default function Navbar() {
  const { currentUser, setCurrentUser, cart, page, setPage } = useApp();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'reviews', label: 'Отзывы' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl">🎵</span>
          <span>МузыкаПро</span>
        </button>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`text-sm font-medium transition-colors ${
                page === link.id
                  ? 'text-foreground border-b-2 border-foreground pb-0.5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
          {currentUser && (
            <button
              onClick={() => setPage('orders')}
              className={`text-sm font-medium transition-colors ${
                page === 'orders'
                  ? 'text-foreground border-b-2 border-foreground pb-0.5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Мои заказы
            </button>
          )}
          {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
            <button
              onClick={() => setPage('admin')}
              className={`text-sm font-medium transition-colors ${
                page === 'admin'
                  ? 'text-gold border-b-2 border-gold pb-0.5'
                  : 'text-gold hover:opacity-80'
              }`}
            >
              Админ-панель
            </button>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={() => setPage('cart')}
            className="relative p-2 hover:bg-secondary rounded-md transition-colors"
          >
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* User */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {currentUser.fullName.split(' ')[0]}
              </span>
              <button
                onClick={() => { setCurrentUser(null); setPage('home'); }}
                className="p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                title="Выйти"
              >
                <Icon name="LogOut" size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage('login')}
                className="text-sm font-medium px-3 py-1.5 hover:bg-secondary rounded-md transition-colors"
              >
                Войти
              </button>
              <button
                onClick={() => setPage('register')}
                className="text-sm font-medium px-3 py-1.5 bg-foreground text-white rounded-md hover:opacity-90 transition-opacity"
              >
                Регистрация
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-border px-4 py-2 flex gap-4 overflow-x-auto">
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => setPage(link.id)}
            className={`text-xs font-medium whitespace-nowrap pb-1 ${
              page === link.id ? 'text-foreground border-b border-foreground' : 'text-muted-foreground'
            }`}
          >
            {link.label}
          </button>
        ))}
        {currentUser && (
          <button
            onClick={() => setPage('orders')}
            className={`text-xs font-medium whitespace-nowrap pb-1 ${
              page === 'orders' ? 'text-foreground border-b border-foreground' : 'text-muted-foreground'
            }`}
          >
            Мои заказы
          </button>
        )}
        {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
          <button
            onClick={() => setPage('admin')}
            className="text-xs font-medium whitespace-nowrap pb-1 text-gold"
          >
            Админ
          </button>
        )}
      </div>
    </header>
  );
}
