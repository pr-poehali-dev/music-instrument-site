export interface Product {
  id: string;
  article: string;
  name: string;
  unit: string;
  price: number;
  supplier: string;
  manufacturer: string;
  category: string;
  isActive: boolean;
  stock: number;
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: '1', article: 'МУ3001', name: 'Гитара акустическая', unit: 'шт', price: 8900, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Струнные', isActive: true, stock: 12, description: 'Акустическая гитара для начинающих и профессионалов', image: 'muz001.jpg' },
  { id: '2', article: 'МУ3002', name: 'Пианино цифровое', unit: 'шт', price: 45900, supplier: 'Музлайн', manufacturer: 'Yamaha', category: 'Клавишные', isActive: true, stock: 3, description: 'Цифровое пианино с 88 клавишами', image: 'muz002.jpg' },
  { id: '3', article: 'МУ3003', name: 'Укулеле', unit: 'шт', price: 3500, supplier: 'Музыкальный', manufacturer: 'Fender', category: 'Струнные', isActive: true, stock: 15, description: 'Гавайская гитара укулеле сопрано', image: 'muz003.jpg' },
  { id: '4', article: 'МУ3004', name: 'Скрипка', unit: 'шт', price: 12500, supplier: 'Аккорд', manufacturer: 'Gibson', category: 'Струнные', isActive: true, stock: 6, description: 'Скрипка студенческая 4/4', image: 'muz004.jpg' },
  { id: '5', article: 'МУ3005', name: 'Барабанная установка', unit: 'шт', price: 28900, supplier: 'Виртуоз', manufacturer: 'Korg', category: 'Ударные', isActive: true, stock: 2, description: 'Акустическая барабанная установка 5 пьес', image: 'muz005.jpg' },
  { id: '6', article: 'МУ3006', name: 'Флейта', unit: 'шт', price: 8900, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Духовые', isActive: true, stock: 8, description: 'Флейта поперечная из никелевого сплава', image: 'muz006.jpg' },
  { id: '7', article: 'МУ3007', name: 'Саксофон', unit: 'шт', price: 35900, supplier: 'Музлайн', manufacturer: 'Fender', category: 'Духовые', isActive: true, stock: 3, description: 'Альт-саксофон для профессионалов', image: 'muz007.jpg' },
  { id: '8', article: 'МУ3008', name: 'Труба', unit: 'шт', price: 18900, supplier: 'Музыкальный', manufacturer: 'Gibson', category: 'Духовые', isActive: true, stock: 5, description: 'Труба Bb лакированная', image: 'muz008.jpg' },
  { id: '9', article: 'МУ3009', name: 'Гармонь', unit: 'шт', price: 25900, supplier: 'Аккорд', manufacturer: 'Korg', category: 'Народные', isActive: true, stock: 4, description: 'Гармонь хромка 25/25', image: 'muz009.jpg' },
  { id: '10', article: 'МУ3010', name: 'Синтезатор', unit: 'шт', price: 32900, supplier: 'Виртуоз', manufacturer: 'Roland', category: 'Клавишные', isActive: true, stock: 5, description: 'Синтезатор 61 клавиша с встроенными ритмами', image: 'muz010.jpg' },
  { id: '11', article: 'МУ3011', name: 'Бас-гитара', unit: 'шт', price: 15900, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Струнные', isActive: true, stock: 7, description: 'Электрическая бас-гитара 4-струнная', image: 'muz011.jpg' },
  { id: '12', article: 'МУ3012', name: 'Электрогитара', unit: 'шт', price: 18900, supplier: 'Музлайн', manufacturer: 'Fender', category: 'Струнные', isActive: true, stock: 6, description: 'Электрогитара Stratocaster тип', image: 'muz012.jpg' },
  { id: '13', article: 'МУ3013', name: 'Виолончель', unit: 'шт', price: 45900, supplier: 'Музыкальный', manufacturer: 'Gibson', category: 'Струнные', isActive: true, stock: 2, description: 'Виолончель студенческая 4/4', image: 'muz013.jpg' },
  { id: '14', article: 'МУ3014', name: 'Арфа', unit: 'шт', price: 125900, supplier: 'Аккорд', manufacturer: 'Korg', category: 'Струнные', isActive: true, stock: 1, description: 'Концертная арфа 47 струн', image: 'muz014.jpg' },
  { id: '15', article: 'МУ3015', name: 'Губная гармошка', unit: 'шт', price: 1200, supplier: 'Виртуоз', manufacturer: 'Roland', category: 'Духовые', isActive: false, stock: 25, description: 'Диатоническая губная гармошка', image: 'muz015.jpg' },
  { id: '16', article: 'МУ3016', name: 'Кастаньеты', unit: 'шт', price: 850, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Народные', isActive: false, stock: 20, description: 'Деревянные кастаньеты', image: 'muz016.jpg' },
  { id: '17', article: 'МУ3017', name: 'Бубен', unit: 'шт', price: 950, supplier: 'Музлайн', manufacturer: 'Fender', category: 'Ударные', isActive: false, stock: 18, description: 'Бубен деревянный с тарелочками', image: 'muz017.jpg' },
  { id: '18', article: 'МУ3018', name: 'Маракасы', unit: 'шт', price: 750, supplier: 'Музыкальный', manufacturer: 'Gibson', category: 'Ударные', isActive: false, stock: 22, description: 'Маракасы пластиковые пара', image: 'muz018.jpg' },
  { id: '19', article: 'МУ3019', name: 'Треугольник', unit: 'шт', price: 450, supplier: 'Аккорд', manufacturer: 'Korg', category: 'Ударные', isActive: false, stock: 28, description: 'Треугольник металлический 15 см', image: 'muz019.jpg' },
  { id: '20', article: 'МУ3020', name: 'Метроном', unit: 'шт', price: 1800, supplier: 'Виртуоз', manufacturer: 'Roland', category: 'Аксессуары', isActive: false, stock: 15, description: 'Механический метроном', image: 'muz020.jpg' },
  { id: '21', article: 'МУ3021', name: 'Тюнер для гитары', unit: 'шт', price: 950, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Аксессуары', isActive: false, stock: 25, description: 'Клипсовый хроматический тюнер', image: 'muz021.jpg' },
  { id: '22', article: 'МУ3022', name: 'Струны для гитары', unit: 'набор', price: 550, supplier: 'Музлайн', manufacturer: 'Fender', category: 'Аксессуары', isActive: false, stock: 40, description: 'Струны для акустической гитары набор', image: 'muz022.jpg' },
  { id: '23', article: 'МУ3023', name: 'Чехол для гитары', unit: 'шт', price: 2200, supplier: 'Музыкальный', manufacturer: 'Gibson', category: 'Аксессуары', isActive: true, stock: 12, description: 'Мягкий чехол для акустической гитары', image: 'muz023.jpg' },
  { id: '24', article: 'МУ3024', name: 'Подставка для нот', unit: 'шт', price: 1500, supplier: 'Аккорд', manufacturer: 'Korg', category: 'Аксессуары', isActive: false, stock: 16, description: 'Складная подставка для нот металлическая', image: 'muz024.jpg' },
  { id: '25', article: 'МУ3025', name: 'Пюпитр', unit: 'шт', price: 1800, supplier: 'Виртуоз', manufacturer: 'Roland', category: 'Аксессуары', isActive: false, stock: 14, description: 'Пюпитр оркестровый с подсветкой', image: 'muz025.jpg' },
  { id: '26', article: 'МУ3026', name: 'Наушники студийные', unit: 'шт', price: 4500, supplier: 'МузТорг', manufacturer: 'Yamaha', category: 'Аксессуары', isActive: true, stock: 10, description: 'Студийные наушники закрытого типа', image: 'muz026.jpg' },
  { id: '27', article: 'МУ3027', name: 'Микрофон', unit: 'шт', price: 3200, supplier: 'Музлайн', manufacturer: 'Fender', category: 'Аксессуары', isActive: true, stock: 12, description: 'Динамический микрофон для вокала', image: 'muz027.jpg' },
  { id: '28', article: 'МУ3028', name: 'Усилитель для гитары', unit: 'шт', price: 8900, supplier: 'Музыкальный', manufacturer: 'Gibson', category: 'Аксессуары', isActive: true, stock: 6, description: 'Гитарный комбо-усилитель 15W', image: 'muz028.jpg' },
  { id: '29', article: 'МУ3029', name: 'Педаль эффектов', unit: 'шт', price: 12500, supplier: 'Аккорд', manufacturer: 'Korg', category: 'Аксессуары', isActive: true, stock: 4, description: 'Педаль эффектов для электрогитары', image: 'muz029.jpg' },
  { id: '30', article: 'МУ3030', name: 'Стойка для микрофона', unit: 'шт', price: 2500, supplier: 'Виртуоз', manufacturer: 'Roland', category: 'Аксессуары', isActive: false, stock: 4, description: 'Стойка для микрофона напольная телескопическая', image: 'muz030.jpg' },
];

export const CATEGORIES = ['Все', 'Струнные', 'Клавишные', 'Духовые', 'Ударные', 'Народные', 'Аксессуары'];
