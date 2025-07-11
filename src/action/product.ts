"use server"
import { db } from '@/lib/db';
import { revalidatePath } from "next/cache";
import path from "path"
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

export async function uploadProductImage(file: File, productId: number) {
    if (!file || !productId) {
        throw new Error("Fichier ou ID produit manquant.");
    }

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Get file extension from original filename
        const originalName = file.name;
        const extension = path.extname(originalName);
        const fileName = `${productId}${extension}`;

        // Ensure the directory exists
        const uploadDir = path.join(process.cwd(), "public/products");
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const uploadPath = path.join(uploadDir, fileName);
        await writeFile(uploadPath, buffer);

        return `/products/${fileName}`; // Return the image URL
    } catch (error) {
        console.error("Erreur lors de l'upload de l'image :", error);
        throw new Error("Erreur lors de l'upload de l'image.");
    }
}

// Server action to add product with image
export async function addProductWithImage(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        const categoryData = formData.get('category') as string;

        // Parse l'objet category depuis JSON
        let category;
        try {
            category = JSON.parse(categoryData);
        } catch {
            throw new Error("Format de catégorie invalide.");
        }

        const productData = {
            name: formData.get('name') as string,
            category: category, // Maintenant c'est un objet
            price: parseFloat(formData.get('price') as string),
            description: formData.get('description') as string,
            sizes: formData.get('sizes') as string,
            colors: formData.get('colors') as string,
            isFeatured: formData.get('isFeatured') === 'true',
            isNew: formData.get('isNew') === 'true',
        };

        if (!file || file.size === 0) {
            throw new Error("Aucun fichier n'a été sélectionné.");
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            throw new Error("Le fichier doit être une image.");
        }

        console.log("Product data:", productData);
        if (!productData.category) {
            throw new Error("Catégorie manquante ou invalide.");
        }
        const categoryId = parseInt(productData.category, 10);

        const categoryExists = await db.category.findUnique({
            where: { id: categoryId }
        });

        if (!categoryExists) {
            throw new Error("La catégorie spécifiée n'existe pas.");
        }

        // Get next product ID from database
        const lastProduct = await db.product.findFirst({
            orderBy: { id: 'desc' }
        });
        const nextId = (lastProduct?.id || 0) + 1;

        // Upload image first
        const imageUrl = await uploadProductImage(file, nextId);

        // Save product to database
        const product = await db.product.create({
            data: {
                name: productData.name,
                category: {
                    connect: { id: categoryId }
                },
                price: productData.price,
                image: imageUrl,
                description: productData.description,
                sizes: productData.sizes ? productData.sizes.split(",").map(s => s.trim()) : [],
                colors: productData.colors ? productData.colors.split(",").map(c => c.trim()) : [],
                isFeatured: productData.isFeatured,
                isNew: productData.isNew,
            }
        });


        revalidatePath('/admin/products'); // Adjust path as needed
        return { success: true, product };

    } catch (error) {
        console.error("Erreur lors de l'ajout du produit:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erreur inconnue"
        };
    }
}

export async function addProductToWishlist(productId: number, userId: string) {
    try {
        const existingItem = await db.wishlist.findFirst({
            where: {
                productId: productId,
                userId: userId
            }
        });

        if (existingItem) {
            await db.wishlist.delete({
                where: {
                    id: existingItem.id,
                },
            });
            return { success: false, message: "Produit supprimé de la wishlist." };
        }

        const wishlistItem = await db.wishlist.create({
            data: {
                productId: productId,
                userId: userId
            }
        });

        return { success: true, wishlistItem };
    } catch (error) {
        console.error("Erreur lors de l'ajout à la wishlist:", error);
        return { success: false, error: error instanceof Error ? error.message : "Erreur inconnue" };
    }
}