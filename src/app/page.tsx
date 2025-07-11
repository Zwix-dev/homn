// app/page.tsx
import { getProductsByCategory, getFeaturedProducts, getNewArrivals, getAllCategories, getWishlistProducts } from '@/data/products';
import ClientHomeWrapper from '@/components/home/ClientHomePageWrapper';
import { createAuthClient } from 'better-auth/react';
import { getCardProducts } from '@/data/card';
import { auth } from '@/lib/auth';
import { headers } from "next/headers";


export default async function HomePage() {
const session = await auth.api.getSession({
    headers: await headers(),
  });
  const featuredProducts = await getFeaturedProducts();
  const newArrivals = await getNewArrivals();
  const allProducts = await getProductsByCategory('all');
  const categories = await getAllCategories();
  const cartItems = session?.user.id ? await getCardProducts(session.user.id) : [];
  const favourites = session?.user.id ? await getWishlistProducts(session?.user.id): [];


  return (
    <ClientHomeWrapper
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
      allProducts={allProducts}
      categories={categories}
      favourites={favourites}
    />
  );
}
