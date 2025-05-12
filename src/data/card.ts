import { db } from "@/lib/db";
export async function getCardProducts(userId: string) {
  const products = await db.cart.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
    },
  });
  return products;
  
}