'use client';

import React, { useState, useMemo } from 'react';
import { Category, Product } from '@/types';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import FeaturedSection from '@/components/home/FeaturedSection';
import ProductSection from '@/components/home/ProductSection';
import Newsletter from '@/components/home/Newsletter';
import CategoryBanner from '@/components/home/CategoryBanner';
import ProductDetailClientWrapper from '@/components/product/ProductDetailClientWrapper';
import Footer from '@/components/layout/Footer';

interface ClientHomeWrapperProps {
    allProducts: Product[];
    featuredProducts: Product[];
    newArrivals: Product[];
    categories?: Category[];
    favourites?: Product[];
}

const ClientHomeWrapper: React.FC<ClientHomeWrapperProps> = ({
    allProducts,
    featuredProducts,
    newArrivals,
    categories = [],
    favourites = [],
}) => {
    const [currentCategory, setCurrentCategory] = useState<Category | undefined>(
        categories.find(c => c.value === 'all')
    );
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const isFav = useMemo(() => {
        if (!selectedProduct) return false;
        return favourites.some(fav => fav.id === selectedProduct.id);
    }, [selectedProduct, favourites]);
   

    return (
        <div className="min-h-screen flex flex-col">
            <Header setCurrentCategory={setCurrentCategory} />

            <main className="flex-grow">
                <Hero />
                {
                    newArrivals.length > 0 && (
                        <FeaturedSection
                            title="Nouveaux Arrivages"
                            products={newArrivals}
                            onProductClick={setSelectedProduct}
                        />)
                }

                <section className="py-16 bg-rose-50">
                    <div className="container mx-auto px-4 space-y-8">
                        <CategoryBanner
                            title="Belles Femmes"
                            subtitle="Sentez vous belle avec nos vêtements tendance."
                            image="hero2.jpg"
                            ctaText="Découvrir nos ensembles"
                            onClick={() => {
                                const cat = categories.find(c => c.name.toLowerCase() === 'ensemble');
                                if (cat) setCurrentCategory(cat);
                            }}
                            position="right"
                        />

                        {/* <CategoryBanner
                            title="Les petites Gazelles"
                            subtitle="Explorer notre seconde marque pour les femmes."
                            image="hero3.jpg"
                            ctaText="Découvrir nos collections"
                            onClick={() => {
                                const cat = categories.find(c => c.name.toLowerCase() === 'chemise');
                                if (cat) setCurrentCategory(cat);
                            }}
                            position="right"
                        /> */}
                    </div>
                </section>

                <ProductSection
                    category={currentCategory}
                    allProducts={allProducts}
                    favourites={favourites}
                    onProductClick={setSelectedProduct}
                />
                
                <FeaturedSection
                    title="Produits En Vedette"
                    products={featuredProducts}
                    onProductClick={setSelectedProduct}
                />

                <Newsletter />
            </main>

            <Footer />
            <ProductDetailClientWrapper 
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)} 
                isFav={isFav}  
            />
        </div>
    );
};

export default ClientHomeWrapper;