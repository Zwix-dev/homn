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
}

const ClientHomeWrapper: React.FC<ClientHomeWrapperProps> = ({
    allProducts,
    featuredProducts,
    newArrivals,
}) => {
    const [currentCategory, setCurrentCategory] = useState<Category>('all');


    const filteredProducts = useMemo(() => {
        if (currentCategory === 'all') return allProducts;
        return allProducts.filter((product) => product.category === currentCategory);
    }, [currentCategory, allProducts]);


    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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


                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 space-y-8">
                        <CategoryBanner
                            title="Les Ensembles"
                            subtitle="Découvrez tout nos ensembles"
                            image="https://static.parisfashionshops.com/paris/images/homme/zayne-paris/ensembles/pro_858446cb24e9d369f299f25d770c/ensemble-texture-chemise-avec-short_bleu_67b64d400e426.jpg"
                            ctaText="Trouver mon ensemble"
                            onClick={() => setCurrentCategory('ensemble')} />

                        <CategoryBanner
                            title="Essentielle"
                            subtitle="Rehaussez votre style de tous les jours avec notre collection variée de chemises."
                            image="https://static.parisfashionshops.com/paris/images/homme/yves-enzo/chemises/pro_3e26793c9195fbce3826fae6f7df/chemisette-carreaux-tartan-coupe-confort_damier_67e146140d137.jpg"
                            ctaText="Visiter la boutique chemise"
                            onClick={() => setCurrentCategory('chemise')}
                            position="right"
                        />
                    </div>
                </section>

                <ProductSection
                    category={currentCategory}
                    allProducts={allProducts}
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
            <ProductDetailClientWrapper product={selectedProduct}
                onClose={() => setSelectedProduct(null)} />
        </div>
    );
};

export default ClientHomeWrapper;
