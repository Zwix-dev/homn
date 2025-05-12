export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt : Date;
  updatedAt : Date;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type Category = 'all' | 'ensemble' | 'pantalon' | 'chemise' | 'accessoires';

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
