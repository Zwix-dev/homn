export default function ForgotForm() {
    return (
        <div className="w-100 space-y-8">

            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div>
                    <img src="/icon.jpg" alt="Logo" className="w-32 h-32 mb-4 rounded-2xl opacity-40" />
                </div>

                <div className="rounded-lg  bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-bold mb-4">Mot de passe oublié</h1>
                    <p className="text-gray-600 mb-6">Entrez votre adresse e-mail pour réinitialiser votre mot de passe.</p>
                    <form className="w-full max-w-sm space-y-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
                        <button type="submit" className="w-full bg-[#b38c3d] hover:bg-[#9a7834] text-white py-2 rounded-md transition-colors">Envoyer le lien de réinitialisation</button>
                    </form>
                </div>
            </div>


        </div>

    );
}

