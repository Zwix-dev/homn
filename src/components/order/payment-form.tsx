"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { useCart } from "@/hooks/CartContext" // Assurez-vous que ce chemin est correct
import getStripe from "@/utils/get-stripe" // Assurez-vous que ce chemin est correct

interface PaymentFormProps {
    subtotal: number
    shippingCost: number
    onPaymentSuccess: () => void
    onPaymentError: (message: string) => void
}

export function PaymentForm({ subtotal, shippingCost, onPaymentSuccess, onPaymentError }: PaymentFormProps) {
    const { cartItems } = useCart()
    const [isLoading, setIsLoading] = useState(false)

    const total = subtotal + shippingCost

    const handleStripeCheckout = async () => {
        setIsLoading(true)
        try {
            const stripe = await getStripe()


            const res = await fetch('/api/stripe/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({
                    customer_email: "arthur.duval18@gmail.com",
                    items: cartItems.map((item) => ({
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: item.name,
                                images: [`https://via.placeholder.com/${item.image}`],
                            },
                            unit_amount: Math.round((item.price || item.price) * 100),
                        },
                        quantity: item.quantity,
                    })),
                }),
            }); 
            if (!res.ok) { 
                console.error('Erreur lors de la création de la session Stripe'); 
                setIsLoading(false); 
                return; 
            } 

            const { id } = await res.json();

            const { error } = await stripe!.redirectToCheckout({ sessionId: id }); 
            if (error) {
                console.warn('Erreur Stripe:', error.message);

            }


            if (error) {
                throw new Error(error.message || "Erreur lors de la redirection vers Stripe")
            }
            // Si la redirection réussit, onPaymentSuccess sera appelée par la page de succès de Stripe
        } catch (error: any) {
            console.error("Erreur lors du paiement:", error)
            onPaymentError(error.message || "Une erreur inconnue est survenue lors du paiement.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Détails du paiement</h3>
            <div className="grid gap-2">
                <div className="flex justify-between">
                    <span>Sous-total:</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Frais de livraison:</span>
                    <span className="font-medium">€{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                    <span>Total à payer:</span>
                    <span>€{total.toFixed(2)}</span>
                </div>
            </div>
            <p className="text-sm text-muted-foreground">
                En cliquant sur "Procéder au paiement", vous serez redirigé vers une page sécurisée pour compléter votre achat.
            </p>
            <Button onClick={handleStripeCheckout} disabled={isLoading || cartItems.length === 0} className="w-full">
                {isLoading ? "Chargement..." : "Procéder au paiement"}
            </Button>
        </div>
    )
}
