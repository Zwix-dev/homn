"use client"
import { User, ShoppingBag, Heart, CreditCard, MapPin, SettingsIcon, LogOut, ChevronRight, X } from "lucide-react"
import type React from "react"

import { useState } from "react"
import type { UserInterface } from "@/types"
import { authClient } from "@/lib/auth-client"
import PersonalInfo from "./Personnal-infos"
import Orders from "./Orders"
import Wishlist from "./wishlist"
import PaymentMethods from "./Payement-methods"
import Addresses from "./Adresses"
import Settings from "./settings"

const sidebarItems = [
  { id: "personal-info", name: "Informations personnelles", icon: User },
  { id: "orders", name: "Mes commandes", icon: ShoppingBag },
  { id: "wishlist", name: "Liste de souhaits", icon: Heart },
  { id: "payment-methods", name: "Moyens de paiement", icon: CreditCard },
  { id: "addresses", name: "Adresses", icon: MapPin },
  { id: "settings", name: "Paramètres", icon: SettingsIcon },
]

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("personal-info")

  const { data: session, isPending, error, refetch } = authClient.useSession()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Cette fonction sera implémentée dans les actions
  }

  const renderContent = () => {
    const user = session?.user as UserInterface

    switch (activeSection) {
      case "personal-info":
        return (
          <PersonalInfo
            user={user}
            handleInputChange={handleInputChange}
            updateUserData={async () => {
              await authClient.updateUser(user)
              refetch()
            }}
          />
        )
      case "orders":
        return <Orders />
      case "wishlist":
        return <Wishlist />
      case "payment-methods":
        return <PaymentMethods />
      case "addresses":
        return <Addresses />
      case "settings":
        return <Settings />
      default:
        return (
          <PersonalInfo
            user={user}
            handleInputChange={handleInputChange}
            updateUserData={async () => {
              await authClient.updateUser(user)
              refetch()
            }}
          />
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Mon compte</h2>
          </div>
          <nav className="flex-1 space-y-1 px-4">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center w-full px-4 py-3 text-left rounded-lg ${
                  activeSection === item.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="flex-1">{item.name}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
            <button className="flex items-center w-full px-4 py-3 mt-6 text-left text-red-600 hover:bg-red-50 rounded-lg">
              <LogOut className="mr-3 h-5 w-5" />
              <span className="flex-1">Déconnexion</span>
            </button>
          </nav>
        </aside>

        {/* Mobile sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Fermer le menu</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Mon compte</h2>
              </div>
              <nav className="flex-1 space-y-1 px-4">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center w-full px-4 py-3 text-left rounded-lg ${
                      activeSection === item.id
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => {
                      setActiveSection(item.id)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span className="flex-1">{item.name}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
                <button className="flex items-center w-full px-4 py-3 mt-6 text-left text-red-600 hover:bg-red-50 rounded-lg">
                  <LogOut className="mr-3 h-5 w-5" />
                  <span className="flex-1">Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 p-6 mt-20">{renderContent()}</main>
      </div>
    </div>
  )
}
