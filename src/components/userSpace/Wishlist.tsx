import { X } from "lucide-react"
import { getWishlistProducts } from "@/data/products"
import type { Product, WishlistProduct } from "@/types"

interface WishlistProps {
  products: Product[];
}

export default function Wishlist({ products }: WishlistProps) {
 
  if (!products || products.length === 0) {
    return <p>Votre liste de souhaits est vide.</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Liste de souhaits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200">
              {/* Image si elle existe */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-gray-600">{product.price} €</p>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800">
                  Ajouter au panier
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500">
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
