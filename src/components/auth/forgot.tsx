"use client";
import { authClient } from "@/lib/auth-client";

export default function ForgotForm() {

    async function submitform(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        await authClient.requestPasswordReset({
            email: email,
            redirectTo: '/auth/new-password',
        });
    }

    return (
        <div className="w-100 space-y-8">
            <div className="flex flex-col items-center justify-center p-4">
                <div className="flex flex-col items-center space-y-2 mb-4">
                    <a href="/">
                        <img src="/icon.jpg" alt="Logo" width={120} height={40} className="mb-2 rounded-sm opacity-85" />

                    </a>
                    <h1 className="text-2xl font-semibold text-[#6B4A52]">Mot de passe oublié</h1>
                    <p className="text-center text-sm text-[#6B4A52]/70">
                        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
                    </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-lg border border-[#E0CFCB]">

                    <form className="w-full max-w-sm space-y-4" onSubmit={submitform}>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[#6B4A52]"
                        >
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 border border-[#E0CFCB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA6A1]"
                        />
                        <button
                            type="submit"
                            className="w-full bg-button hover:bg-[#57373F] text-white py-2 rounded-md transition-colors"
                        >
                            Envoyer le lien de réinitialisation
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
