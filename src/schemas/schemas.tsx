import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Le prix doit être un nombre positif",
  }),
  image: z.string().min(1, "L'image est requise"),
  description: z.string().optional(),
  sizes: z.string().min(1, "Les tailles sont requises"),
  colors: z.string().min(1, "Les couleurs sont requises"),
  isFeatured: z.boolean(),
  isNew: z.boolean(),
})