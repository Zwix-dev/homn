import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"

const Footer: React.FC = () => 
{
  return (
    <footer className="bg-belles-femmes-maroon text-belles-femmes-text-light py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icon.jpg"
              alt="Belles Femmes Logo"
              width={100}
              height={100}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-sm">
            Votre destination pour des vêtements femme grande taille élégants et confortables.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-belles-femmes-text-light hover:text-belles-femmes-pink">
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-belles-femmes-text-light hover:text-belles-femmes-pink">
              <InstagramIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-belles-femmes-text-light hover:text-belles-femmes-pink">
              <TwitterIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:text-belles-femmes-pink">Accueil</Link></li>
            <li><Link href="#" className="hover:text-belles-femmes-pink">Boutique</Link></li>
            <li><Link href="#" className="hover:text-belles-femmes-pink">Nouveautés</Link></li>
            <li><Link href="#" className="hover:text-belles-femmes-pink">Promotions</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Aide & Contact</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:text-belles-femmes-pink">FAQ</Link></li>
            <li><Link href="#" className="hover:text-belles-femmes-pink">Livraison</Link></li>
            <li><Link href="#" className="hover:text-belles-femmes-pink">Retours</Link></li>
            <li><Link href="#" className="hover:text-belles-femmes-pink">Contactez-nous</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Informations Légales</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:text-belles-femmes-pink">Mentions Légales</Link></li>
            <li><Link href="#" className="hover:text-belles-femmes-pink">Politique de Confidentialité</Link></li>
            <li><Link href="#" className="hover:text-belles-femmes-pink">Conditions Générales de Vente</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-belles-femmes-pink pt-6 mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Belles Femmes. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
