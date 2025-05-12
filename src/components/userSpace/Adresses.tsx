import { MapPin } from 'lucide-react'

export default function Addresses() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Adresses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Adresse de livraison</h3>
              <div className="mt-4 space-y-1 text-gray-600">
                <p>Jean Dupont</p>
                <p>123 Rue de Paris</p>
                <p>75001 Paris</p>
                <p>France</p>
                <p>06 12 34 56 78</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-600 hover:text-gray-900">Modifier</button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Adresse de facturation</h3>
              <div className="mt-4 space-y-1 text-gray-600">
                <p>Jean Dupont</p>
                <p>123 Rue de Paris</p>
                <p>75001 Paris</p>
                <p>France</p>
                <p>06 12 34 56 78</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-600 hover:text-gray-900">Modifier</button>
            </div>
          </div>
        </div>
      </div>
      <button className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
        Ajouter une adresse
      </button>
    </div>
  )
}
