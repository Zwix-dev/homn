import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '@/hooks/CartContext';
import {Button} from '../ui/Button';
import { X } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  
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
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-red-600 mr-3">${product.salePrice.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Taille</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${
                          selectedSize === size
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
                        className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${
                          selectedColor === color
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
                
                <Button 
                  size="lg" 
                  
                  onClick={handleAddToCart}
                >
                  Ajouter Au Panier
                </Button>
                
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