import React from 'react';
import Link from 'next/link';
import { XCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CancelPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Paiement annulé</h1>
        <p className="text-lg text-gray-600 mb-8">
          Votre transaction a été annulée. Aucun montant n'a été prélevé 
          et les articles sont toujours dans votre panier.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour à la boutique
            </Link>
          </Button>
          
        
        </div>
      </div>
    </div>
  );
}