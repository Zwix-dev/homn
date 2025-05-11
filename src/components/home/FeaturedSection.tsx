import React from 'react';
import { Product } from '../../types';
import ProductCard from '../product/ProductCard';

interface FeaturedSectionProps {
  title: string;
  products: Product[];
  onProductClick: (product: Product) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ title, products, onProductClick }) => {
  console.log('FeaturedSection products:', products);
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;