import React from 'react';
import { Product } from '../../types';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';


interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { name, price, image, isNew } = product;

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="relative overflow-hidden rounded-lg mb-3">
        <div className="aspect-[3/4] bg-gray-100 w-full relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Quick add to cart overlay */}
          <div className="absolute inset-0 flex items-end justify-center group-hover:opacity-100 transition-all duration-300">
            <div className="p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer">
              <Button
                variant={"default"}
                className='hover:cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(product);
                }}
              >
                <ShoppingBag size={16} className="mr-2" />
                Aperçu Rapide
              </Button>
            </div>
          </div>

          {/* New tag */}
          {isNew && (
            <div className="absolute top-2 left-2 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded">
              Nouveau
            </div>
          )}

          {/* Sale tag */}

        </div>
      </div>

      <h3 className="font-medium text-gray-900 mb-1">{name}</h3>

      <div className="flex items-center">

        <span className="font-medium text-gray-900">${price.toFixed(2)}</span>

      </div>
    </div>
  );
};

export default ProductCard;