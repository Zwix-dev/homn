import { X } from "lucide-react"

export default function Wishlist() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Liste de souhaits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Slim Fit Chinos</h3>
              <p className="mt-1 text-gray-600">89,99 €</p>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800">
                  Ajouter au panier
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500">
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
