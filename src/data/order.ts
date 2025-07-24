import { db } from "@/lib/db";

export async function getOrders(userId: string) {
  const orders = await db.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      shippingAddress: true,
      orderItems: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return orders;
}

export async function getAllOrders() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      shippingAddress: true,
      orderItems: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return orders;
}
