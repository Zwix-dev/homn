// pages/index.tsx
"use client";
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedSection from '@/components/home/FeaturedSection';
import CategoryBanner from '@/components/home/CategoryBanner';
import Newsletter from '@/components/home/Newsletter';
import ProductGrid from '@/components/product/ProductGrid';
import ProductDetail from '@/components/product/ProductDetail';
import { Category, Product } from '@/types';
import { getProductsByCategory, getFeaturedProducts, getNewArrivals } from '@/data/products';

interface HomeProps {
  user: { email: string } | null;
}

const HomePage = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const filteredProducts = getProductsByCategory(currentCategory);
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentCategory={setCurrentCategory} />

      <main className="flex-grow">
        <Hero />

        {/* {user && (
          <div className="text-right container mx-auto px-4 mt-4">
            <button className="text-sm text-gray-600 underline">
              Se déconnecter ({user.email})
            </button>
          </div>
        )} */}

        <FeaturedSection
          title="Nouveaux Arrivages"
          products={newArrivals}
          onProductClick={setSelectedProduct}
        />

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 space-y-8">
            <CategoryBanner
              title="Les Ensembles"
              subtitle="Découvrez tout nos ensembles"
              image="https://static.parisfashionshops.com/paris/images/homme/zayne-paris/ensembles/pro_858446cb24e9d369f299f25d770c/ensemble-texture-chemise-avec-short_bleu_67b64d400e426.jpg"
              ctaText="Trouver mon ensemble"
              onClick={() => setCurrentCategory('ensemble')}
            />

            <CategoryBanner
              title="Essentielle"
              subtitle="Rehaussez votre style de tous les jours avec notre collection variée de chemises."
              image="https://static.parisfashionshops.com/paris/images/homme/yves-enzo/chemises/pro_3e26793c9195fbce3826fae6f7df/chemisette-carreaux-tartan-coupe-confort_damier_67e146140d137.jpg"
              ctaText="Visiter la boutique chemise"
              position="right"
              onClick={() => setCurrentCategory('chemise')}
            />
          </div>
        </section>

        <section id="products-section" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {currentCategory === 'all'
                ? 'Tous nos produits'
                : currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
            </h2>
            <p className="text-gray-600 mb-8">{filteredProducts.length} Produits</p>

            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                onProductClick={setSelectedProduct}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun produit trouvé.</p>
              </div>
            )}
          </div>
        </section>

        <FeaturedSection
          title="Produits En Vedette"
          products={featuredProducts}
          onProductClick={setSelectedProduct}
        />

        <Newsletter />
      </main>

      <Footer />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default HomePage;

