"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator" // Assurez-vous que ce composant est disponible ou ajoutez-le

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface AddressFormData {
  streetAddress1: string
  streetAddress2: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
}

interface ReviewOrderFormProps {
  cartItems: CartItem[]
  address: AddressFormData
  subtotal: number
  shippingCost: number
  couponCode: string
  discount: number
  onApplyCoupon: (code: string) => void
  onProceedToPayment: () => void // Nouvelle prop pour passer à l'étape suivante
}

export function ReviewOrderForm({
  cartItems,
  address,
  subtotal,
  shippingCost,
  couponCode,
  discount,
  onApplyCoupon,
  onProceedToPayment,
}: ReviewOrderFormProps) {
  const [localCouponCode, setLocalCouponCode] = useState(couponCode)
  const totalAfterDiscount = subtotal + shippingCost - discount

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Révision de la commande</h3>
      <p className="text-muted-foreground">Veuillez vérifier les détails de votre commande avant de confirmer.</p>

      {/* Section Adresse de livraison */}
      <div className="grid gap-2">
        <h4 className="font-medium">Adresse de livraison:</h4>
        <p>{address.streetAddress1}</p>
        {address.streetAddress2 && <p>{address.streetAddress2}</p>}
        <p>
          {address.city}, {address.stateProvince} {address.postalCode}
        </p>
        <p>{address.country}</p>
      </div>

      <Separator />

      {/* Section Articles du panier */}
      <div className="grid gap-2">
        <h4 className="font-medium">Articles du panier:</h4>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground">Votre panier est vide.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>€{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      <Separator />

      {/* Section Coupon */}
      <div className="grid gap-2">
        <h4 className="font-medium">Code promo:</h4>
        <div className="flex gap-2">
          <Input
            id="couponCode"
            placeholder="Entrez votre code promo"
            value={localCouponCode}
            onChange={(e) => setLocalCouponCode(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={() => onApplyCoupon(localCouponCode)}>Appliquer</Button>
        </div>
        {discount > 0 && <p className="text-sm text-green-600">Réduction appliquée: -€{discount.toFixed(2)}</p>}
      </div>

      <Separator />

      {/* Section Totaux */}
      <div className="grid gap-2">
        <div className="flex justify-between">
          <span>Sous-total:</span>
          <span className="font-medium">€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frais de livraison:</span>
          <span className="font-medium">€{shippingCost.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction:</span>
            <span className="font-medium">-€{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>Total à payer:</span>
          <span>€{totalAfterDiscount.toFixed(2)}</span>
        </div>
      </div>

      <Button onClick={onProceedToPayment} className="w-full">
        Procéder au paiement
      </Button>
    </div>
  )
}
