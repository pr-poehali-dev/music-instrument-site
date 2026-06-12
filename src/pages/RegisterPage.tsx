import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { USERS } from '@/data/users';
import { User } from '@/data/users';
import Icon from '@/components/ui/icon';

export default function RegisterPage() {
  const { setCurrentUser, setPage } = useApp();
  const [form, setForm] = useState({ fullName: '', login: '', password: '', confirm: '', phone: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const PHONE_REGEX = /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length === 0) return '';
    let result = '8';
    if (digits.length > 1) result += '(' + digits.slice(1, 4);
    if (digits.length >= 4) result += ')' + digits.slice(4, 7);
    if (digits.length >= 7) result += '-' + digits.slice(7, 9);
    if (digits.length >= 9) result += '-' + digits.slice(9, 11);
    return result;
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.trim().split(' ').length < 2) errs.fullName = 'Введите полное имя (Фамилия Имя)';
    if (!form.login.trim()) errs.login = 'Введите логин (email)';
    else if (USERS.some(u => u.login.toLowerCase() === form.login.toLowerCase())) errs.login = 'Этот логин уже занят';
    if (form.password.length < 8) errs.password = 'Пароль минимум 8 символов';
    if (form.password !== form.confirm) errs.confirm = 'Пароли не совпадают';
    if (!PHONE_REGEX.test(form.phone)) errs.phone = 'Формат: 8(XXX)XXX-XX-XX';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: `u${Date.now()}`,
        role: 'client',
        fullName: form.fullName.trim(),
        login: form.login.trim(),
        password: form.password,
      };
      USERS.push(newUser);
      setCurrentUser(newUser);
      setPage('home');
      setLoading(false);
    }, 600);
  };

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 animate-fade-in">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🎵</div>
          <h1 className="text-2xl font-bold">Регистрация</h1>
          <p className="text-muted-foreground text-sm mt-1">Создайте аккаунт покупателя</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-6 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">ФИО</label>
            <input
              value={form.fullName}
              onChange={e => set('fullName', e.target.value)}
              placeholder="Иванов Иван Иванович"
              className={`w-full border rounded-md px-3 py-2.5 text-sm focus:outline-none transition-colors ${errors.fullName ? 'border-red-400' : 'border-border focus:border-foreground'}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Логин (email)</label>
            <input
              value={form.login}
              onChange={e => set('login', e.target.value)}
              placeholder="your@email.com"
              autoComplete="username"
              className={`w-full border rounded-md px-3 py-2.5 text-sm focus:outline-none transition-colors ${errors.login ? 'border-red-400' : 'border-border focus:border-foreground'}`}
            />
            {errors.login && <p className="text-red-500 text-xs mt-1">{errors.login}</p>}
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Телефон</label>
            <input
              value={form.phone}
              onChange={e => set('phone', formatPhone(e.target.value))}
              placeholder="8(XXX)XXX-XX-XX"
              maxLength={16}
              className={`w-full border rounded-md px-3 py-2.5 text-sm focus:outline-none transition-colors ${errors.phone ? 'border-red-400' : 'border-border focus:border-foreground'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Пароль</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => set('password', e.target.value)}
                placeholder="Минимум 8 символов"
                autoComplete="new-password"
                className={`w-full border rounded-md px-3 py-2.5 pr-10 text-sm focus:outline-none transition-colors ${errors.password ? 'border-red-400' : 'border-border focus:border-foreground'}`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon name={showPass ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Повторите пароль</label>
            <input
              type="password"
              value={form.confirm}
              onChange={e => set('confirm', e.target.value)}
              placeholder="Повторите пароль"
              autoComplete="new-password"
              className={`w-full border rounded-md px-3 py-2.5 text-sm focus:outline-none transition-colors ${errors.confirm ? 'border-red-400' : 'border-border focus:border-foreground'}`}
            />
            {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-white py-2.5 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
          </button>

          <div className="text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{' '}
            <button type="button" onClick={() => setPage('login')} className="text-foreground font-medium hover:underline">
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
