'use client';

import React, { useEffect, useState } from 'react';
import { Category, Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import { on } from 'events';

interface Props {
  category?: Category;
  allProducts: Product[];
  onProductClick: (product: Product) => void;
  favourites?: Product[];
}

const ProductSection: React.FC<Props> = ({ category, allProducts, onProductClick, favourites }) => {
  console.log(category)
  const filtered = !category || category.value === 'all'
  ? allProducts
  : allProducts.filter(p => p.category.name === category.value);
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

       
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {!category || category.name === 'all'
            ? 'Tous nos produits'
            : category?.name?.charAt(0).toUpperCase() + category?.name?.slice(1)}
        </h2>
        <p className="text-gray-600 mb-8">{filtered.length} Produits</p>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} onProductClick={onProductClick} favourites={favourites} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun produit trouvé.</p>
          </div>
        )}
      </div>
    </section>
  );
};
export default ProductSection;
