"use client"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
export function LoginForm() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter();
    async function onSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const response = await authClient.signIn.email({
                /**
                 * The user email
                 */
                email,
                /**
                 * The user password
                 */
                password,

                /**
                 * remember the user session after the browser is closed. 
                 * @default true
                 */
                rememberMe: false
            }, {


                onError: (ctx) => {
                    console.log(ctx.error.message);
                }


            })
            if (!!response?.error) {
                alert(response?.error.message)

            } else {

                router.push("/")
            }
        } catch (e) {

            setError("E-mail ou mot de passe incorrect");
        }

    }
    return (
        <div className="w-100 space-y-8">
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-2xl font-semibold text-[#b38c3d]">Connexion</h1>
                <p className="text-center text-sm text-gray-600">Entrez vos identifiants pour accéder à votre compte</p>
            </div>

            <div className="rounded-lg border border-[#e6d7c3] bg-white p-6 shadow-sm">
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="exemple@email.com"
                            className="border-[#e6d7c3] focus-visible:ring-[#b38c3d]"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Link href="/forgot-password" className="text-xs text-[#b38c3d] hover:underline">
                                Mot de passe oublié?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
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

                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm font-normal">
                            Se souvenir de moi
                        </Label>
                    </div>

                    <Button type="submit" className="w-full bg-[#b38c3d] hover:bg-[#9a7834] text-white">
                        Se connecter
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                    Vous n&apos;avez pas de compte?{" "}
                    <Link href="/auth/register" className="text-[#b38c3d] hover:underline">
                        S&apos;inscrire
                    </Link>
                </div>
            </div>
        </div>
    )
}
