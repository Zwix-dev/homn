import { db } from "@/lib/db";

export async function addToCart(userId: string, productId: number, quantity: number) {
  const cart = await db.cart.create({
    data: {
      userId,
      productId,
      quantity
    },
  });
  return cart;
}
export async function removeFromCart(userId: string, productId: number) {
  const cart = await db.cart.deleteMany({
    where: {
      userId,
      productId,
    },
  });
  return cart;
}