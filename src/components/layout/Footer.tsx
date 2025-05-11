import React from 'react';
import ContactModal from "../ContactModal";
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">HOMN</h3>
            <p className="text-gray-300 mb-4">
              Votre nouveau dressing en ligne !
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Magasin</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Nouveaux Arrivages
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Produits En Vedette
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Tout Nos Produits
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Cartes Cadeau
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
               <ContactModal />
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Livraison Et Retour
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Rejoins Notre Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Abonnez-vous pour recevoir des mises à jour sur les nouveautés, les offres spéciales et les conseils de style.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre e-mail"
                className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none w-full"
              />
              <button
                
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-r transition-colors"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} HOMN. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Politique De Confidentialité
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Conditions D'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;