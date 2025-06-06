"use server"
import React from 'react';
import Sidebar from '@/components/userSpace/Sidebar';
import { getWishlistProducts } from '@/data/products';
import { auth } from "@/lib/auth";
import { headers } from 'next/headers';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers() 
  });

  const userId = session?.user?.id;  
  if (!userId) {
    return <div>Veuillez vous connecter.</div>;
  }
  const wishlistProducts = await getWishlistProducts(userId);

  return (
    <Sidebar wishlist={wishlistProducts} />
  );
}

