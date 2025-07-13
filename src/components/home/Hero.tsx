import React from 'react';
import {Button} from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Hero"
          className="w-full h-full object-cover opacity-60"
          fetchPriority="high"
          
        />
      </div>
      
      <div className="relative container mx-auto px-4 py-32 md:py-48">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trouve ton style !
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Découvrez nos collection de vêtements pour homme un confort absolu et un style assumé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Nouveaux Arrivages</Button>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
              Explorer Les Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;