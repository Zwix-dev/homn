"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StepperIndicator } from "@/components/order/stepper-indicator"
import { AddressForm } from "@/components/order/adress-form"
import { PaymentForm } from "@/components/order/payment-form"
import { ReviewOrderForm } from "@/components/order/review-order-form" // Nouvelle importation
import { useCart } from "@/hooks/CartContext"
import { useSearchParams } from "next/navigation"

export default function OrderPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    address: {
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
    },
    paymentMethod: "",
  })
  const [shippingCost, setShippingCost] = useState(0)
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const steps = ["Adresse de livraison", "Méthode de paiement", "Révision de la commande", "Confirmation"]

  useEffect(() => {
    if (searchParams.get("success")) {
      setCurrentStep(3)
      clearCart()
      console.log("Paiement réussi!")
    }
    if (searchParams.get("canceled")) {
      setPaymentError("Paiement annulé. Veuillez réessayer.")
      setCurrentStep(1)
      console.log("Paiement annulé.")
    }
  }, [searchParams, clearCart])

  const calculateShippingCost = (country: string): number => {
    switch (country) {
      case "FR":
        return 5.0
      case "CA":
        return 15.0
      case "US":
        return 12.0
      case "DE":
        return 7.5
      case "GB":
        return 10.0
      default:
        return 20.0
    }
  }

  const handleCountryChange = (country: string) => {
    const cost = calculateShippingCost(country)
    setShippingCost(cost)
  }

  const handleApplyCoupon = (code: string) => {
    // Logique simple de coupon
    if (code.toUpperCase() === "SAVE10") {
      setDiscount(10.0) // Réduction fixe de 10 EUR
      setCouponCode(code)
      setPaymentError(null) // Efface toute erreur précédente
    } else {
      setDiscount(0)
      setCouponCode("")
      setPaymentError("Code promo invalide.")
    }
  }

  const handleNext = () => {
    setPaymentError(null)
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Processus de commande terminé.")
    }
  }

  const handlePrevious = () => {
    setPaymentError(null)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateAddressFormData = (data: Partial<typeof formData.address>) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, ...data },
    }))
  }

  const renderStepContent = () => {
    const totalAfterDiscount = cartTotal + shippingCost - discount

    switch (currentStep) {
      case 0:
        return (
          <AddressForm
            formData={formData.address}
            onUpdate={updateAddressFormData}
            onCountryChange={handleCountryChange}
          />
        )
      case 1:
        return (
          <PaymentForm
            subtotal={cartTotal}
            shippingCost={shippingCost}
            onPaymentSuccess={() => {
              // La logique de changement d'étape est maintenant dans l'useEffect
            }}
            onPaymentError={(message) => setPaymentError(message)}
          />
        )
      case 2:
        return (
          <ReviewOrderForm
            cartItems={cartItems}
            address={formData.address}
            subtotal={cartTotal}
            shippingCost={shippingCost}
            couponCode={couponCode}
            discount={discount}
            onApplyCoupon={handleApplyCoupon}
            onProceedToPayment={() => setCurrentStep(1)} // Retourne à l'étape de paiement
          />
        )
      case 3:
        return (
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-green-600">Commande Confirmée !</h3>
            <p className="text-muted-foreground">Merci pour votre achat. Votre commande a été soumise avec succès.</p>
            <p className="text-sm text-muted-foreground">Un email de confirmation a été envoyé à votre adresse.</p>
            <Button onClick={() => (window.location.href = "/")}>Retour à l'accueil</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Passer votre commande</CardTitle>
          <CardDescription>Veuillez suivre les étapes pour compléter votre commande.</CardDescription>
        </CardHeader>
        <CardContent>
          <StepperIndicator steps={steps} currentStep={currentStep} />
          {paymentError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Erreur:</strong>
              <span className="block sm:inline"> {paymentError}</span>
            </div>
          )}
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || currentStep === 3}>
            Précédent
          </Button>
          {currentStep !== 1 && currentStep !== 2 && currentStep !== 3 && <Button onClick={handleNext}>Suivant</Button>}
          {currentStep === 3 && <Button onClick={() => (window.location.href = "/")}>Terminer</Button>}
        </CardFooter>
      </Card>
    </div>
  )
}
