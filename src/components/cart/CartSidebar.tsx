"use client"

import type React from "react"
import { X, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/CartContext" // Assurez-vous que ce chemin est correct
import { Button } from "@/components/ui/Button" // Assurez-vous que ce chemin est correct et que c'est bien le composant shadcn/ui Button
import { useRouter } from "next/navigation" // Importation du hook useRouter

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const router = useRouter() // Initialisation du routeur

  if (!isOpen) return null

  const handleCheckout = () => {
    onClose() // Ferme la barre latérale du panier
    router.push("/order") // Redirige vers la page de commande en plusieurs étapes
  }

  return (
    <>
      {/* Overlay pour fermer le panier en cliquant à l'extérieur */}
      <div className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity" onClick={onClose} />

      {/* Contenu de la barre latérale du panier */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Mon Panier</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Fermer le panier"
            >
              <X size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-center mb-6">Panier vide</p>
              <Button onClick={onClose}>Continuer vos achats</Button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex border-b border-gray-200 pb-4"
                  >
                    <div className="w-20 h-24 rounded bg-gray-100 overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">
                        Taille: {item.selectedSize} | Couleur: {item.selectedColor}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-blue-900 transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <MinusCircle size={18} />
                          </button>
                          <span className="mx-2 w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-blue-900 transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <PlusCircle size={18} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            €{((item.price || item.price) * item.quantity).toFixed(2)}
                          </p>
                          {/* La condition (item.price || item.price) est redondante, mais je la laisse telle quelle si elle a une signification spécifique pour vous */}
                          {item.price && (
                            <p className="text-sm line-through text-gray-500">
                              €{(item.price * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Supprimer l'article"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium"> Calculé à la fin</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button size="lg" onClick={handleCheckout}>
                  Procéder au paiement
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Continuer vos achats
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CartSidebar
