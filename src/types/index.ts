export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  isNew: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  // shop: 'shop1' | 'shop2'; // Indique la boutique à laquelle le produit appartient
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Category { 
  id: number;
  name: string;
  value: string | null; // ⬅️ ici, on accepte null
  createdAt?: Date;
  updatedAt?: Date;
}

// export type Category = 'all' | 'ensemble' | 'pantalon' | 'chemise' | 'accessoires';

export interface UserInterface {
  id: string;
  role:string
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface WishlistProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  productId: string;
}

// Interface Address mise à jour selon le schéma Prisma
export interface Address {
  id: number;
  userId: string;
  street: string;        // Changé de firstName/lastName/addressLine1/addressLine2
  city: string;
  state: string;
  country: string;
  zipCode: string;       // Changé de postalCode
  createdAt: Date;
  updatedAt: Date;
}

// Interface Order mise à jour selon le schéma Prisma
export interface Order {
  id: number;
  userId: string;
  addressId: number;
  totalPrice: number;    // Dans Prisma c'est un Float
  status: string;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: Address;
  orderItems: OrderItem[];
}

// Interface OrderItem mise à jour selon le schéma Prisma
export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;         // Dans Prisma c'est un Float
  product: Product;
}

// Types optionnels pour les relations si vous voulez les utiliser séparément
export interface OrderWithoutRelations {
  id: number;
  userId: string;
  addressId: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemWithoutRelations {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}