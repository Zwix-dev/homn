"use client";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "sonner";
import { set } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import { Eye, EyeOff } from "lucide-react";


export default function NewPassword() {

    const [errorForm, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    async function submitform(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password1 = formData.get("password") as string;
        const password2 = formData.get("confirmPassword") as string;
        const token = new URLSearchParams(window.location.search).get("token");
        if (!token) {
            setError("L'url de réinitialisation du mot de passe est invalide.");
            return;
        }
        if (!password1 || !password2 || password1.trim() === "" || password2.trim() === "") {
            console.log("Veuillez remplir tous les champs.");
            setError("Veuillez remplir tous les champs.");
            return;
        }
        if (password1 !== password2) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        const { data, error } = await authClient.resetPassword({
            newPassword: password1,
            token,
        });
        if (error) {
            console.error("Erreur lors de la réinitialisation du mot de passe:", error);
            if (error.code?.toLowerCase() === "invalid_token") {
                setError("Le lien de réinitialisation du mot de passe est invalide ou a expiré.");
                return;
            }
            if (error.code?.toLowerCase() === "password_too_short") {
                setError("Le mot de passe doit comporter au moins 8 caractères.");
                return;
            }
            setError("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
            return;
        }
        if (!data) {
            setError("Aucune donnée reçue après la réinitialisation du mot de passe.");
            return;
        }
        toast.success("Mot de passe réinitialisé avec succès !");

        //need to wait for the toast to show before redirecting
        await new Promise(resolve => setTimeout(resolve, 1000));

        window.location.href = "/auth/login";

        setError(null);
    }

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="w-full max-w-md space-y-6">
                <div className="flex flex-col items-center">
                    {/* <a href="/">                          
                    <img src="/icon.jpg" alt="Logo" width={120} height={40} className="mb-2 rounded-sm opacity-85" />
                    </a> */}

                    <h1 className="text-xl font-bold text-rose-900">Nouveau mot de passe</h1>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                    <form className="space-y-5" onSubmit={submitform}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-rose-900 mb-1">
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 pr-10 border border-[#E0CFCB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA6A1]"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 text-rose-900"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    <span className="sr-only">
                                        {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-rose-900 mb-1">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA6A1]"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 text-rose-900]"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    <span className="sr-only">
                                        {showConfirmPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-button hover:bg-rose-900 cursor-pointer text-white font-medium py-2 rounded-md transition-colors"
                        >
                            Réinitialiser le mot de passe
                        </button>
                    </form>
                    {errorForm && <p className="text-red-500 text-sm mt-4">{errorForm}</p>}
                </div>
            </div>
        </div >

    );
}
