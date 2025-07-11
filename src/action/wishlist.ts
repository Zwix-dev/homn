// app/actions/wishlist.ts
"use server"
import { db } from '@/lib/db';
import { revalidatePath } from "next/cache"

export async function deleteWishlistItem(productId: number, userId: string) {
    if (!productId || !userId) return
    await db.wishlist.deleteMany({
        where: {
            productId,
            userId,
        },
    })
    revalidatePath("/dashboard")
}
