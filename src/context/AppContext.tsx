import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, USERS } from '@/data/users';
import { Product } from '@/data/products';

export type OrderStatus = 'Новая' | 'Идет обучение' | 'Завершено' | 'Отменен' | 'В обработке';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  address: string;
  createdAt: string;
  deliveryDate: string;
  receiptCode: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  orderId: string;
  productName: string;
  rating: number;
  text: string;
  createdAt: string;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'receiptCode'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  page: string;
  setPage: (page: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const INITIAL_ORDERS: Order[] = [
  {
    id: 'o1', orderNumber: 'GT01', userId: '7', userName: 'Александров Илья Сергеевич',
    items: [{ product: { id: '1', article: 'МУ3001', name: 'Гитара акустическая', unit: 'шт', price: 8900, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Струнные', isActive: true, stock: 12, description: '', image: '' }, quantity: 1 }],
    total: 8900, status: 'Завершено', address: '420151, г. Лесной, ул. Вишневая, 32',
    createdAt: '2025-03-01', deliveryDate: '2025-03-29', receiptCode: '19001'
  },
  {
    id: 'o2', orderNumber: 'PN02', userId: '8', userName: 'Боброва Екатерина Андреевна',
    items: [{ product: { id: '2', article: 'МУ3002', name: 'Пианино цифровое', unit: 'шт', price: 45900, supplier: 'Музлайн', manufacturer: 'Yamaha', category: 'Клавишные', isActive: true, stock: 3, description: '', image: '' }, quantity: 1 }],
    total: 45900, status: 'Завершено', address: '125061, г. Лесной, ул. Подгорная, 8',
    createdAt: '2025-03-03', deliveryDate: '2025-03-31', receiptCode: '19002'
  },
  {
    id: 'o3', orderNumber: 'FL03', userId: '9', userName: 'Власов Денис Юрьевич',
    items: [{ product: { id: '6', article: 'МУ3006', name: 'Флейта', unit: 'шт', price: 8900, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Духовые', isActive: true, stock: 8, description: '', image: '' }, quantity: 1 }],
    total: 8900, status: 'Новая', address: '630370, г. Лесной, ул. Шоссейная, 24',
    createdAt: '2025-03-05', deliveryDate: '2025-04-02', receiptCode: '19003'
  },
  {
    id: 'o4', orderNumber: 'GT01', userId: '7', userName: 'Гапкина Светлана Михайловна',
    items: [{ product: { id: '1', article: 'МУ3001', name: 'Гитара акустическая', unit: 'шт', price: 8900, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Струнные', isActive: true, stock: 12, description: '', image: '' }, quantity: 1 }],
    total: 8900, status: 'Завершено', address: '400562, г. Лесной, ул. Зеленая, 32',
    createdAt: '2025-03-07', deliveryDate: '2025-04-04', receiptCode: '19004'
  },
  {
    id: 'o5', orderNumber: 'PN02', userId: '8', userName: 'Дубровин Евгений Павлович',
    items: [{ product: { id: '2', article: 'МУ3002', name: 'Пианино цифровое', unit: 'шт', price: 45900, supplier: 'Музлайн', manufacturer: 'Yamaha', category: 'Клавишные', isActive: true, stock: 3, description: '', image: '' }, quantity: 1 }],
    total: 45900, status: 'Отменен', address: '614510, г. Лесной, ул. Маяковского, 47',
    createdAt: '2025-03-09', deliveryDate: '2025-04-06', receiptCode: '19005'
  },
];

const INITIAL_REVIEWS: Review[] = [
  { id: 'r1', userId: '7', userName: 'Михайлюк Анна', orderId: 'o1', productName: 'Гитара акустическая', rating: 5, text: 'Отличный инструмент! Звук чистый, гриф удобный. Очень доволен покупкой.', createdAt: '2025-04-01' },
  { id: 'r2', userId: '8', userName: 'Ситдикова Елена', orderId: 'o2', productName: 'Пианино цифровое', rating: 4, text: 'Хороший синтезатор, чувствительность клавиш на уровне. Немного долгая доставка.', createdAt: '2025-04-05' },
  { id: 'r3', userId: '7', userName: 'Михайлюк Анна', orderId: 'o4', productName: 'Гитара акустическая', rating: 5, text: 'Уже вторая покупка в этом магазине. Всё как обычно на высоте!', createdAt: '2025-04-10' },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('muzpro_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [page, setPage] = useState('home');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('muzpro_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('muzpro_user');
    }
  }, [currentUser]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Omit<Order, 'id' | 'orderNumber' | 'receiptCode'>) => {
    const newOrder: Order = {
      ...order,
      id: `o${Date.now()}`,
      orderNumber: `ORD${Math.floor(Math.random() * 9000) + 1000}`,
      receiptCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      orders, addOrder, updateOrderStatus,
      reviews, addReview,
      page, setPage,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
