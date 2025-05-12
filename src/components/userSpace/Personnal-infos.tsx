"use client"
import type { UserInterface } from "@/types"
import type React from "react"
import { useTransition } from "react"
import { toast } from "sonner"

interface PersonalInfoProps {
    user: UserInterface
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    updateUserData: () => Promise<void>
}

export default function PersonalInfo({ user, handleInputChange, updateUserData }: PersonalInfoProps) {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async () => {
        try {
            startTransition(async () => {
                await updateUserData()
                toast("Vos informations ont été mises à jour")
            })
        } catch (error) {
            toast("Une erreur est survenue lors de la mise à jour")
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
            <div className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input
                            type="text"
                            name="name"
                            value={user?.name || ""}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user?.email || ""}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending ? "Enregistrement..." : "Enregistrer les modifications"}
                    </button>
                </div>
            </div>
        </div>
    )
}
