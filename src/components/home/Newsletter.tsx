import React from 'react';
import {Button} from '../ui/Button';

const Newsletter: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Rejoins notre Newsletter</h2>
          <p className="text-gray-600 mb-8">
          Abonnez-vous pour recevoir des mises à jour sur les nouveautés, les offres spéciales et les conseils de style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 ">
            <input
              type="email"
              placeholder="Votre e-mail:"
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-900"
            />
            <Button className='h-14'>S'abonner</Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
          En vous inscrivant, vous acceptez notre politique de confidentialité et consentez à recevoir des mises à jour de notre société.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;