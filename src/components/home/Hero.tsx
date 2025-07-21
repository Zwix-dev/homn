import React from 'react';
import {Button} from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-rose-900/10 text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="/herobanner.jpg"
          alt="Hero"
          className="w-full h-full object-cover opacity-60"
          fetchPriority="high"
        />
      </div>
      
      <div className="relative container mx-auto px-4 py-32 md:py-48">
        <div className="max-w-xl">
          <h1 className="text-4xl text-rose-900 md:text-5xl lg:text-6xl font-bold mb-6">
            Trouve ton style !
          </h1>
          <p className="text-lg md:text-xl mb-8 text-black">
            Découvrez nos collections de vêtements pour femmes grande taille, un confort absolu et un style assumé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-rose-700 hover:bg-rose-800 text-white border-rose-700">
              Nouveaux Arrivages
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-black border-black hover:bg-rose-700 hover:border-none hover:text-white">
              Explorer Les Collections
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;