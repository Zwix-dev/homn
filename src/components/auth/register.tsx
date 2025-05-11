"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
export function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    async function onSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const name = formData.get("full-name") as string;

            await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/"
            }, {
                onRequest: (ctx) => {
                    setIsLoading(true);
                },
                onSuccess: (ctx) => {
                    setIsLoading(false)
                    router.push("/")
                },
                onError: (ctx) => {
                    setError(error);
                },
            });


        } catch (e) {

            setIsLoading(false);
        }
    }
    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col items-center space-y-2">
                <img src="/icon.jpg" alt="HOMN Logo" width={120} height={40} className="mb-2" />
                <h1 className="text-2xl font-semibold text-[#b38c3d]">Créer un compte</h1>
                <p className="text-center text-sm text-gray-600">Inscrivez-vous pour accéder à toutes nos fonctionnalités</p>
            </div>

            <div className="rounded-lg border border-[#e6d7c3] bg-white p-6 shadow-sm">
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input id="firstName" placeholder="Jean" className="border-[#e6d7c3] focus-visible:ring-[#b38c3d]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Nom</Label>
                            <Input id="lastName" placeholder="Dupont" className="border-[#e6d7c3] focus-visible:ring-[#b38c3d]" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="exemple@email.com"
                            className="border-[#e6d7c3] focus-visible:ring-[#b38c3d]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="border-[#e6d7c3] focus-visible:ring-[#b38c3d]"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                <span className="sr-only">
                                    {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="border-[#e6d7c3] focus-visible:ring-[#b38c3d]"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                <span className="sr-only">
                                    {showConfirmPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-xs font-normal">
                            J&apos;accepte les{" "}
                            <Link href="/terms" className="text-[#b38c3d] hover:underline">
                                conditions d&apos;utilisation
                            </Link>{" "}
                            et la{" "}
                            <Link href="/privacy" className="text-[#b38c3d] hover:underline">
                                politique de confidentialité
                            </Link>
                        </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#b38c3d] hover:bg-[#9a7834] text-white">
                        S&apos;inscrire
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                    Vous avez déjà un compte?{" "}
                    <Link href="/login" className="text-[#b38c3d] hover:underline">
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    )
}