"use client"
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { Button } from '../ui/Button';

import { Category } from '@/types';
import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react"
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useRouter } from 'next/navigation';
import { set } from 'better-auth';
import { Product } from '@/types';
import CartSidebar from '../cart/CartSidebar';
const { useSession } = createAuthClient()
interface HeaderProps {
  setCurrentCategory: (category: Category) => void;
  cartItems?: Product[];
}

const Header: React.FC<HeaderProps> = ({ setCurrentCategory ,cartItems}) => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { data: session } = useSession()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  }

  const headerClasses = `fixed w-full z-20 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`;

  const categories: { name: string; value: Category }[] = [
    { name: 'Tout nos produits', value: 'all' },
    { name: 'Ensemble', value: 'ensemble' },
    { name: 'Pantalon', value: 'pantalon' },
    { name: 'Chemise', value: 'chemise' },
    { name: 'Accessoires', value: 'accessoires' }
  ];

  const handleCategoryClick = (category: Category) => {
    setCurrentCategory(category);
    setMobileMenuOpen(false);
  };
 
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-gray-900" onClick={() => handleCategoryClick('all')}>
              HOMN
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <a
                key={category.value}
                href="#"
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
                onClick={() => handleCategoryClick(category.value)}
              >
                {category.name}
              </a>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-700 hover:text-blue-900">
              <Search size={20} />
            </button>
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                    <Avatar>
                      <AvatarFallback className="bg-purple-100 text-purple-700">{session.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <button
                    className="w-full hover:bg-accent hover:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 dark:data-[variant=destructive]:hover:bg-destructive/20 data-[variant=destructive]:hover:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    onClick={() => {

                      handleLogout()
                    }}
                  >
                    Logout
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <button
                    className="text-gray-700 hover:text-blue-900 relative mt-1">
                    <User size={20} />
                  </button>
                </Link>
              </>
            )}


            <button
              className="text-gray-700 hover:text-blue-900 relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              className="text-gray-700 hover:text-blue-900 relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="text-gray-700 hover:text-blue-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <a
                  key={category.value}
                  href="#"
                  className="text-gray-700 hover:text-blue-900 py-2 transition-colors font-medium"
                  onClick={() => handleCategoryClick(category.value)}
                >
                  {category.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Search size={16} className="mr-2" />
                  Recherche
                </Button>
                <Button variant="outline" size="sm">
                  <User size={16} className="mr-2" />
                  Compte
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)}/>
    </header>
  );
};

export default Header;