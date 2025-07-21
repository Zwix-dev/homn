"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddressFormData {
  streetAddress1: string
  streetAddress2: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
}

interface AddressFormProps {
  formData: AddressFormData
  onUpdate: (data: Partial<AddressFormData>) => void
  onCountryChange: (country: string) => void // Nouvelle prop
}

export function AddressForm({ formData, onUpdate, onCountryChange }: AddressFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({ [e.target.id]: e.target.value })
  }

  const handleSelectChange = (value: string, id: keyof AddressFormData) => {
    onUpdate({ [id]: value })
    if (id === "country") {
      onCountryChange(value) // Appelle la fonction de rappel pour le changement de pays
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="streetAddress1">Adresse (Ligne 1)</Label>
        <Input
          id="streetAddress1"
          placeholder="123 Rue Principale"
          value={formData.streetAddress1}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="streetAddress2">Adresse (Ligne 2) (Optionnel)</Label>
        <Input
          id="streetAddress2"
          placeholder="Appartement, suite, etc."
          value={formData.streetAddress2}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="city">Ville</Label>
          <Input id="city" placeholder="Votre ville" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stateProvince">État/Province</Label>
          <Input
            id="stateProvince"
            placeholder="Votre état ou province"
            value={formData.stateProvince}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="postalCode">Code Postal</Label>
          <Input
            id="postalCode"
            placeholder="Votre code postal"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="country">Pays</Label>
          <Select value={formData.country} onValueChange={(value) => handleSelectChange(value, "country")} required>
            <SelectTrigger id="country">
              <SelectValue placeholder="Sélectionnez un pays" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FR">France</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="US">États-Unis</SelectItem>
              <SelectItem value="DE">Allemagne</SelectItem>
              <SelectItem value="GB">Royaume-Uni</SelectItem>
              {/* Ajoutez d'autres pays si nécessaire */}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
