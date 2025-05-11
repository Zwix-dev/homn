import { db } from '@/lib/db';
import { Product } from '../types';

// export const products: Product[] = [
//   {
//     id: 1,
//     name: "Classic Oxford Shirt",
//     category: "ensemble",
//     price: 79.99,
//     image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     description: "A timeless Oxford shirt crafted from premium cotton. Perfect for both casual and formal occasions.",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     colors: ["White", "Blue", "Light Blue"],
//     isFeatured: true
//   },
//   {
//     id: 2,
//     name: "Slim Fit Chinos",
//     category: "pantalon",
//     price: 89.99,
//     image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     description: "Modern slim fit chinos made from stretch cotton for comfort and style. Versatile for any occasion.",
//     sizes: ["30", "32", "34", "36", "38"],
//     colors: ["Khaki", "Navy", "Olive"],
//     isNew: true
//   },
//   {
//     id: 3,
//     name: "Tailored Wool Suit",
//     category: "chemise",
//     price: 399.99,
//     image: "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     description: "Impeccably tailored suit crafted from premium Italian wool. The perfect addition to any gentleman's wardrobe.",
//     sizes: ["38R", "40R", "42R", "44R", "46R"],
//     colors: ["Charcoal", "Navy", "Black"],
//     isFeatured: true
//   },
//   {
//     id: 4,
//     name: "Leather Belt",
//     category: "accessoires",
//     price: 59.99,
//     image: "https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     description: "Handcrafted from full-grain leather, this belt adds a touch of sophistication to any outfit.",
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["Brown", "Black", "Tan"],
//     isNew: true
//   },
  
// ];

export async function getProducts () {
  const products = await db.product.findMany({});
  return products
}
     
export async function getProductsByCategory (category: string) {
  const products = await db.product.findMany({
    where: {
      category: category === 'all' ? undefined : category,
    },
  });
  return products
}

export async function getFeaturedProducts () {
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
    },
  });
  return products
}
export async function getNewArrivals () {
  const products = await db.product.findMany({
    where: {
      isNew: true,
    },
  });
  return products.map(product => ({
    ...product,
    image: product.image,
    isFeatured: product.isFeatured,
    isNew: product.isNew,
    category: product.category,
    description: product.description,
    name: product.name,
    price: product.price,
    id: product.id,
    sizes: product.sizes,
    colors: product.colors,
  }));
}
export async function getProductById (id: number) {
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });
  return product 
}

// export const getProductsByCategory = (category: string) => {
//   if (category === 'all') return products;
//   return products.filter(product => product.category === category);
// };

// export const getFeaturedProducts = () => {
//   return products.filter(product => product.isFeatured);
// };

// export const getNewArrivals = () => {
//   return products.filter(product => product.isNew);
// };

// export const getProductById = (id: number) => {
//   return products.find(product => product.id === id);
// };