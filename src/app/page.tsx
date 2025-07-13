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
  const [
    featuredProducts,
    newArrivals,
    allProducts,
    categories,
    cartItems,
    favourites
  ] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getProductsByCategory('all'),
    getAllCategories(),
    session?.user.id ? getCardProducts(session.user.id) : Promise.resolve([]),
    session?.user.id ? getWishlistProducts(session.user.id) : Promise.resolve([])
  ]);
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
