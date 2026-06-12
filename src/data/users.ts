export interface User {
  id: string;
  role: 'admin' | 'manager' | 'client';
  fullName: string;
  login: string;
  password: string;
}

export const USERS: User[] = [
  { id: '1', role: 'admin', fullName: 'Никифорова Весения Николаевна', login: '94d5ous@gmail.com', password: 'uzWC67' },
  { id: '2', role: 'admin', fullName: 'Сазонов Руслан Германович', login: 'uth4iz@mail.com', password: '2L6KZG' },
  { id: '3', role: 'admin', fullName: 'Одинцов Серафим Артёмович', login: 'yzls62@outlook.com', password: 'JIFRCZ' },
  { id: '4', role: 'manager', fullName: 'Степанов Михаил Артёмович', login: '1diph5e@tutanota.com', password: '8ntwUp' },
  { id: '5', role: 'manager', fullName: 'Ворсин Петр Евгеньевич', login: 'tjde7c@yahoo.com', password: 'YOyhfR' },
  { id: '6', role: 'manager', fullName: 'Старикова Елена Павловна', login: 'wpmrc3do@tutanota.com', password: 'RSbvHv' },
  { id: '7', role: 'client', fullName: 'Михайлюк Анна Вячеславовна', login: '5d4zbu@tutanota.com', password: 'rwVDh9' },
  { id: '8', role: 'client', fullName: 'Ситдикова Елена Анатольевна', login: 'ptec8ym@yahoo.com', password: 'LdNyos' },
  { id: '9', role: 'client', fullName: 'Ворсин Петр Евгеньевич', login: '1qz4kw@gmail.com', password: 'gynQMT' },
  { id: '10', role: 'client', fullName: 'Старикова Елена Павловна', login: '4np6se@mail.com', password: 'AtnDjr' },
  // Специальный аккаунт администратора
  { id: '0', role: 'admin', fullName: 'Администратор', login: 'Admin', password: 'KorokNET' },
];

export const ADDRESSES = [
  '420151, г. Лесной, ул. Вишневая, 32',
  '125061, г. Лесной, ул. Подгорная, 8',
  '630370, г. Лесной, ул. Шоссейная, 24',
  '400562, г. Лесной, ул. Зеленая, 32',
  '614510, г. Лесной, ул. Маяковского, 47',
  '410542, г. Лесной, ул. Светлая, 46',
  '620839, г. Лесной, ул. Цветочная, 8',
  '443890, г. Лесной, ул. Коммунистическая, 1',
  '603379, г. Лесной, ул. Спортивная, 46',
  '603721, г. Лесной, ул. Гоголя, 41',
];
