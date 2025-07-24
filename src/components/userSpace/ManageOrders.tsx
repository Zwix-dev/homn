"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Order } from "@/types";
import { Package, MapPin } from "lucide-react";

interface OrdersProps {
    orders: Order[];
}

export default function ManageOrders({ orders }: OrdersProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const formatDate = (date: Date) =>
        new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(date));

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(price);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "confirmed":
                return "bg-blue-100 text-blue-800";
            case "shipped":
                return "bg-purple-100 text-purple-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Mes commandes</h2>

            {orders.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-8 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune commande</h3>
                    <p className="mt-1 text-sm text-gray-500">Vous n'avez pas encore passé de commande.</p>
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commande</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.orderItems.length} article{order.orderItems.length > 1 ? "s" : ""}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatPrice(order.totalPrice)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="text-[#b38c3d] hover:text-[#9a7635] hover:underline font-medium"
                                                    >
                                                        Voir les détails
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    {selectedOrder && (
                                                        <DialogHeader>
                                                            <DialogTitle>Détails de la commande #{selectedOrder.id}</DialogTitle>
                                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="space-y-4">
                                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                                                            <Package className="h-5 w-5 mr-2" />
                                                                            Informations de la commande
                                                                        </h4>
                                                                        <div className="text-sm space-y-2">
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Date:</span>
                                                                                <span>{formatDate(selectedOrder.createdAt)}</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Statut:</span>
                                                                                <span>{selectedOrder.status}</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span className="text-gray-500">Total:</span>
                                                                                <span className="font-bold text-lg">{formatPrice(selectedOrder.totalPrice)}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                                                            <MapPin className="h-5 w-5 mr-2" />
                                                                            Adresse de livraison
                                                                        </h4>
                                                                        <div className="text-sm text-gray-600">
                                                                            <p>{selectedOrder.shippingAddress.street}</p>
                                                                            <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                                                                            <p>{selectedOrder.shippingAddress.zipCode}</p>
                                                                            <p>{selectedOrder.shippingAddress.country}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                                                            <MapPin className="h-5 w-5 mr-2" />
                                                                            Informations d'expedition
                                                                        </h4>
                                                                        <div className="text-sm text-gray-600">
                                                                            <div>
                                                                               
                                                                                <label htmlFor="inputexp">Numéro de suivi</label>
                                                                                <input
                                                                                    type="text"
                                                                                    id="inputexp"
                                                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                                                                    placeholder="Entrez le numéro de suivi"
                                                                                    defaultValue={selectedOrder.trackingNumber || ""}
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <h4 className="font-medium text-gray-900 mb-3">Articles commandés</h4>
                                                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                                                        {selectedOrder.orderItems.map((item) => (
                                                                            <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                                                <img
                                                                                    src={item.product.image}
                                                                                    alt={item.product.name}
                                                                                    className="w-16 h-16 object-cover rounded-md"
                                                                                />
                                                                                <div className="flex-1 min-w-0">
                                                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                                                        {item.product.name}
                                                                                    </p>
                                                                                    <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                                                                                    <p className="text-sm text-gray-500">Prix unitaire: {formatPrice(item.price)}</p>
                                                                                </div>
                                                                                <div className="text-sm font-medium text-gray-900">
                                                                                    {formatPrice(item.price * item.quantity)}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="mt-6 flex justify-end w-full">
                                                                <button className="bg-button text-white py-2 px-4 rounded-lg transition-colors">
                                                                    Valider les modification
                                                                </button>
                                                            </div>
                                                        </DialogHeader>
                                                    )}
                                                </DialogContent>
                                            </Dialog>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
