
// import { db } from "@/lib/db";
// import { Order, OrderItem } from "@/types";
// export async function createOrder(userId: string, addressId: number, totalPrice: number, orderItems: OrderItem[]) {
//     try {
//         const order = await db.order.create({
//             data: {
//                 userId,
//                 addressId,
//                 totalPrice,
//                 status: 'pending',
//                 shippingAddress: {
//                     connect: { id: addressId }
//                 },
//                 orderItems: {
//                     create: orderItems.map(item => ({
//                         productId: item.productId,
//                         quantity: item.quantity,
//                         price: item.price
//                     }))
//                 }
//             },
//             include: {
//                 shippingAddress: true,
//                 orderItems: true
//             }
//         });
//         return { success: true, order };
//     } catch (error) {
//         console.error("Erreur lors de la création de la commande:", error);
//         return { success: false, error: error instanceof Error ? error.message : "Erreur inconnue" };
//     }
// }

