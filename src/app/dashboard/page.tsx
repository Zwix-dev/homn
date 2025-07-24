"use server"
import React from 'react';
import Sidebar from '@/components/userSpace/Sidebar';
import { getAllCategories, getProducts, getWishlistProducts } from '@/data/products';
import { auth } from "@/lib/auth";
import { headers } from 'next/headers';
import { getAllOrders, getOrders } from '@/data/order';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = session?.user?.id;
  if (!userId) {
    return <div>Veuillez vous connecter.</div>;
  }

  const [
    wishlistProducts,
    orderHistory,
    allProducts,
    categories,
    allOrders

  ] = await Promise.all([
    getWishlistProducts(userId),
    getOrders(userId),
    getProducts(),
    getAllCategories(),
    getAllOrders(),
    session?.user.id ? getWishlistProducts(session.user.id) : Promise.resolve([])
  ]);

  return (
    <Sidebar wishlist={wishlistProducts} orderHistory={orderHistory} productsPage={allProducts} categories={categories} customersOrders={allOrders}/>
  );
}

