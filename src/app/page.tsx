// app/page.tsx
import { getProductsByCategory, getFeaturedProducts, getNewArrivals } from '@/data/products';
import ClientHomeWrapper from '@/components/home/ClientHomePageWrapper';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const newArrivals = await getNewArrivals();
  const allProducts = await getProductsByCategory('all');

  return (
    <ClientHomeWrapper
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
      allProducts={allProducts}
    />
  );
}
