export default function Orders() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mes commandes</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-2023-1234</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/04/2023</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Livré
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">149,99 €</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href="#" className="text-gray-900 hover:underline">
                    Voir les détails
                  </a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-2023-1189</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">02/03/2023</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Livré
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">89,99 €</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href="#" className="text-gray-900 hover:underline">
                    Voir les détails
                  </a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-2023-1023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/01/2023</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Livré
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">219,98 €</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href="#" className="text-gray-900 hover:underline">
                    Voir les détails
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
