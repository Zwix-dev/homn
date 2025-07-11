"use server"
import React from 'react';
import Sidebar from '@/components/userSpace/Sidebar';
import { getAllCategories, getProducts, getWishlistProducts } from '@/data/products';
import { auth } from "@/lib/auth";
import { headers } from 'next/headers';
import { getOrders } from '@/data/order';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers() 
  });

  const userId = session?.user?.id;  
  if (!userId) {
    return <div>Veuillez vous connecter.</div>;
  }
  const wishlistProducts = await getWishlistProducts(userId);
  const orderHistory = await getOrders(userId);
  const allProducts = await getProducts();
  const categories = await getAllCategories();


  return (
    <Sidebar wishlist={wishlistProducts} orderHistory={orderHistory} productsPage={allProducts} categories={categories}/>
  );
}

