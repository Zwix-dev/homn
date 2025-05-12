import { CreditCard } from "lucide-react"

export default function PaymentMethods() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Moyens de paiement</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded mr-4">
                <CreditCard className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Visa se terminant par 4242</p>
                <p className="text-sm text-gray-500">Expire le 12/24</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-gray-900">Modifier</button>
              <button className="text-red-600 hover:text-red-800">Supprimer</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded mr-4">
                <CreditCard className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Mastercard se terminant par 5678</p>
                <p className="text-sm text-gray-500">Expire le 09/25</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-gray-900">Modifier</button>
              <button className="text-red-600 hover:text-red-800">Supprimer</button>
            </div>
          </div>
        </div>
        <button className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
          Ajouter un moyen de paiement
        </button>
      </div>
    </div>
  )
}
