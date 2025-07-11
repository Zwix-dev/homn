import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '@/hooks/CartContext';
import { Button } from '../ui/Button';
import { Heart, X } from 'lucide-react';
import { createAuthClient } from "better-auth/react"
import { set } from 'zod';
import { addProductToWishlist } from '@/action/product';
import { toast } from "sonner"
const { useSession } = createAuthClient()
interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  isFav?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose,isFav }) => {
  console.log(isFav)
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [wishlist, setWishlist] = useState(false);
  const { data: session } = useSession()

  // Vérifier si le produit est déjà dans la wishlist
  React.useEffect(() => {
    if (isFav) {
      setWishlist(true);
    }
  }, [isFav]);

  
  const handleHearthClick = async () => {
    if (!session?.user) {
      alert("Veuillez vous connecter pour ajouter des produits à votre wishlist.");
      return;
    }
    const addProduct = await addProductToWishlist(product.id, session.user.id)

    if (addProduct.success) {
      setWishlist(true);
      toast.success(addProduct.success ? "Produit ajouté à la wishlist" : "Produit supprimé de la wishlist");
    } else {
      setWishlist(false);
      toast.error(addProduct.message || "Une erreur s'est produite lors de l'ajout à la wishlist");
    }
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-0 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 z-10"
              onClick={onClose}
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="bg-gray-100 p-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto max-h-[500px] object-contain"
                />


              </div>

              {/* Product Details */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>

                <div className="flex items-center mb-6">

                  <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>

                </div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Taille</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${selectedSize === size
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'border-gray-300 text-gray-700 hover:border-gray-700'
                          }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Couleur</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${selectedColor === color
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'border-gray-300 text-gray-700 hover:border-gray-700'
                          }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='flex items-center justify-between mt-6'>
                  <div>
                    <Button
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      Ajouter Au Panier
                    </Button>
                  </div>

                  <div>
                    {session?.user ? (

                      <button className='cursor-pointer text-gray-300 hover:text-red-500' onClick={handleHearthClick}>
                        {wishlist ? (
                          <Heart fill="currentColor" className="text-red-500" />
                        ) : (
                          <Heart className="text-gray-400 hover:text-red-500" />
                        )}
                      </button>

                    ) : (
                      <button className='text-gray-300' onClick={handleHearthClick} >
                        <Heart fill='currentColor' />
                      </button>
                    )}
                  </div>
                </div>



                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-4 text-sm text-gray-600">
                    <p>• Livraison gratuite au delà 120 €</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;