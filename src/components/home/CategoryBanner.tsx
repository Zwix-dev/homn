import React from 'react';
import {Button} from '../ui/Button';

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  position?: 'left' | 'right';
  onClick: () => void;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  title,
  subtitle,
  image,
  ctaText,
  position = 'left',
  onClick,
}) => {
  return (
    <div className="relative overflow-hidden bg-gray-100 rounded-lg">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 h-96 flex items-center">
        <div 
          className={`w-full md:w-1/2 p-8 md:p-12 bg-white bg-opacity-90 
            ${position === 'right' ? 'ml-auto' : ''}`}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-700 mb-6">{subtitle}</p>
          <Button onClick={onClick}>{ctaText}</Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;