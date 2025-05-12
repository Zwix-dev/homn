import React from 'react';
import Link from 'next/link';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SuccessPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Paiement réussi!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Merci pour votre commande. Nous avons bien reçu votre paiement et 
          vous recevrez un e-mail de confirmation sous peu.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/orders">
              Voir ma commande
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/" className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continuer mes achats
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}