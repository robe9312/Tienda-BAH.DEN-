export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  specs: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    description: 'El titanio llega a BAH.DEN. Potencia, diseño y beneficios exclusivos en Malabo.',
    price: 1499,
    category: 'Smartphones',
    image: 'https://picsum.photos/seed/iphone15/800/600',
    specs: ['Chip A17 Pro', 'Cámara Pro de 48 MP', 'Titanio de grado aeroespacial'],
    featured: true,
  },
  {
    id: 'macbook-pro-m3',
    name: 'MacBook Pro M3',
    description: 'Rendimiento extremo para profesionales. La pantalla Liquid Retina XDR más avanzada.',
    price: 2499,
    category: 'Laptops',
    image: 'https://picsum.photos/seed/macbook/800/600',
    specs: ['Chip M3 Pro', 'Hasta 128GB RAM', 'Pantalla ProMotion 120Hz'],
    featured: true,
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    description: 'El reloj más resistente y capaz. Diseñado para la aventura y el rendimiento.',
    price: 899,
    category: 'Wearables',
    image: 'https://picsum.photos/seed/watch/800/600',
    specs: ['Caja de titanio', 'GPS de doble frecuencia', 'Hasta 36 horas de batería'],
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max',
    description: 'Audio de alta fidelidad. Cancelación activa de ruido y sonido espacial.',
    price: 549,
    category: 'Audio',
    image: 'https://picsum.photos/seed/airpods/800/600',
    specs: ['Audio espacial', 'Cancelación de ruido', '20 horas de autonomía'],
  },
];
