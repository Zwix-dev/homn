import type React from "react"
import { Suspense } from "react"

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>Chargement de la commande...</div>}>{children}</Suspense>
}