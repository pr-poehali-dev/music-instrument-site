import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { USERS } from '@/data/users';
import Icon from '@/components/ui/icon';

export default function LoginPage() {
  const { setCurrentUser, setPage } = useApp();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!login.trim()) { setError('Введите логин'); return; }
    if (!password) { setError('Введите пароль'); return; }

    setLoading(true);
    setTimeout(() => {
      const user = USERS.find(u =>
        u.login.toLowerCase() === login.trim().toLowerCase() && u.password === password
      );

      if (user) {
        setCurrentUser(user);
        setPage(user.role === 'admin' || user.role === 'manager' ? 'admin' : 'home');
      } else {
        setError('Неверный логин или пароль');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🎵</div>
          <h1 className="text-2xl font-bold">Вход в МузыкаПро</h1>
          <p className="text-muted-foreground text-sm mt-1">Введите свои данные</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-6 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">Логин (email)</label>
            <input
              value={login}
              onChange={e => setLogin(e.target.value)}
              placeholder="your@email.com"
              autoComplete="username"
              className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Пароль</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Минимум 8 символов"
                autoComplete="current-password"
                className="w-full border border-border rounded-md px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPass ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-white py-2.5 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? 'Проверяем...' : 'Войти'}
          </button>

          <div className="text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <button type="button" onClick={() => setPage('register')} className="text-foreground font-medium hover:underline">
              Зарегистрироваться
            </button>
          </div>
        </form>

        {/* Hint for admin */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3 text-xs text-amber-700">
          <strong>Для администратора:</strong> логин <code className="bg-amber-100 px-1 rounded">Admin</code>, пароль <code className="bg-amber-100 px-1 rounded">KorokNET</code>
        </div>
      </div>
    </div>
  );
}
