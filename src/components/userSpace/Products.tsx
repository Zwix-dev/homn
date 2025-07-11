"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { Category, Product } from "@/types"
import { FileDropZone } from "../ui/filedropzone"
import { productSchema } from "@/schemas/schemas"
import { addProductWithImage, uploadProductImage } from "@/action/product"


interface ProductPageProps {
    productsPa: Product[];
    categories?: Category[];
}

export default function ProductsPage({ productsPa, categories }: ProductPageProps) {
    const [products, setProducts] = useState<Product[]>(productsPa)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "" ,
        price: "",
        image: "",
        description: "",
        sizes: "",
        colors: "",
        isFeatured: false,
        isNew: false,
    })
    const handleFilesSelected = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0];
            setSelectedFile(file); // pour l'envoi
            setNewProduct((prev) => ({ ...prev, image: file.name })); // pour l'affichage / validation
            setFormErrors((prev) => ({ ...prev, image: "" })); // reset erreur éventuelle
        }
    };

    const handleAddProduct = async () => {
        const result = productSchema.safeParse(newProduct);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                const field = err.path[0];
                if (typeof field === "string") {
                    fieldErrors[field] = err.message;
                }
            });
            setFormErrors(fieldErrors);
            return;
        }

        if (!selectedFile) {
            setFormErrors((prev) => ({ ...prev, image: "Veuillez sélectionner une image." }));
            return;
        }

        setFormErrors({}); // Reset errors
        // setIsLoading(true); // Add loading state

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('name', newProduct.name);
            formData.append('category', JSON.stringify(newProduct.category));
            formData.append('price', newProduct.price);
            formData.append('description', newProduct.description);
            formData.append('sizes', newProduct.sizes || '');
            formData.append('colors', newProduct.colors || '');
            formData.append('isFeatured', newProduct.isFeatured.toString());
            formData.append('isNew', newProduct.isNew.toString());

            const result = await addProductWithImage(formData);

            if (result.success) {
                // Reset form
                setNewProduct({
                    name: "",
                    category: "",
                    price: "",
                    image: "",
                    description: "",
                    sizes: "",
                    colors: "",
                    isFeatured: false,
                    isNew: false,
                });
                setSelectedFile(null);
                setIsAddDialogOpen(false);

                // Optionally refresh the products list or use the returned product
                // setProducts(prev => [...prev, result.product]);
            } else {
                const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});
            }
        } catch (error) {
            console.error("Erreur:", error);
            setFormErrors((prev) => ({ ...prev, general: "Erreur lors de l'ajout du produit." }));
        } finally {
            // setIsLoading(false);
        }
    }



        const handleDeleteProduct = (id: number) => {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
                setProducts(products.filter((p) => p.id !== id))
            }
        }

        return (
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Gestion des Produits</h1>
                        <p className="text-gray-600 mt-2">Gérez votre catalogue de produits</p>
                    </div>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Ajouter un produit
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                                <DialogDescription>Remplissez les informations du produit ci-dessous</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nom du produit *</Label>
                                        <Input
                                            id="name"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            placeholder="Ex: T-shirt Premium"
                                            className={formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                                            required
                                        />
                                        {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}

                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Catégorie *</Label>
                                        <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })} >
                                            <SelectTrigger className={formErrors.category ? "border-red-500 focus-visible:ring-red-500" : ""}>
                                                <SelectValue placeholder="Sélectionner une catégorie" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                {categories
                                                    ?.filter((category) => category.name !== 'all')
                                                    .map((category) => (
                                                        <SelectItem key={category.id} value={category.id.toString()}>
                                                            {category.value}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>

                                        </Select>
                                        {formErrors.category && <p className="text-xs text-red-500">{formErrors.category}</p>}

                                    </div>
                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor="price">Prix (€) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        placeholder="29.99"
                                        className={formErrors.price ? "border-red-500 focus-visible:ring-red-500" : ""}
                                        required
                                    />
                                    {formErrors.price && <p className="text-xs text-red-500">{formErrors.price}</p>}

                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        placeholder="Description détaillée du produit..."
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="sizes">Tailles (séparées par des virgules)</Label>
                                        <Input
                                            id="sizes"
                                            value={newProduct.sizes}
                                            onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
                                            placeholder="S, M, L, XL"
                                            className={formErrors.sizes ? "border-red-500 focus-visible:ring-red-500" : ""}
                                        />
                                        {formErrors.sizes && <p className="text-xs text-red-500">{formErrors.sizes}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="colors">Couleurs (séparées par des virgules)</Label>
                                        <Input
                                            id="colors"
                                            value={newProduct.colors}
                                            onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                                            placeholder="Noir, Blanc, Bleu"
                                            className={formErrors.colors ? "border-red-500 focus-visible:ring-red-500" : ""}
                                        />
                                        {formErrors.colors && <p className="text-xs text-red-500">{formErrors.colors}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Card className={formErrors.image ? "border-red-500 focus-visible:ring-red-500" : ""}>
                                        <CardHeader>
                                            <CardTitle>Image</CardTitle>
                                            <CardDescription>Taille maximale :</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <FileDropZone
                                                accept="image/*"
                                                maxSize={5 * 1024 * 1024} // 5MB
                                                onFilesSelected={handleFilesSelected}
                                            />
                                        </CardContent>
                                    </Card>
                                    {formErrors.image && <p className="text-xs text-red-500">{formErrors.image}</p>}

                                </div>
                                <div className="flex gap-6">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="featured"
                                            checked={newProduct.isFeatured}
                                            onCheckedChange={(checked) => setNewProduct({ ...newProduct, isFeatured: checked })}
                                        />
                                        <Label htmlFor="featured">Produit vedette</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="new"
                                            checked={newProduct.isNew}
                                            onCheckedChange={(checked) => setNewProduct({ ...newProduct, isNew: checked })}
                                        />
                                        <Label htmlFor="new">Nouveau produit</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button onClick={handleAddProduct}>Ajouter le produit</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Grille des produits */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                            <div className="relative aspect-[4/3] w-full mt-[-1.5rem]">
                                <img
                                    src={product.image || "/placeholder.svg?height=200&width=200"}
                                    alt={product.name}
                                    className="w-full h-64 object-cover block"
                                />
                                <div className="absolute top-2 right-2 flex gap-1">
                                    {product.isFeatured && (
                                        <Badge variant="secondary" className="text-xs">
                                            Vedette
                                        </Badge>
                                    )}
                                    {product.isNew && (
                                        <Badge variant="default" className="text-xs">
                                            Nouveau
                                        </Badge>
                                    )}
                                </div>
                            </div>


                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{product.name}</CardTitle>
                                        <CardDescription>{product.category.value}</CardDescription>
                                    </div>
                                    <div className="text-lg font-bold text-primary">{product.price.toFixed(2)}€</div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                                <div className="space-y-2 mb-4">
                                    {product.sizes.length > 0 && (
                                        <div>
                                            <span className="text-xs font-medium text-gray-500">Tailles: </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {product.sizes.map((size, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {size}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {product.colors.length > 0 && (
                                        <div>
                                            <span className="text-xs font-medium text-gray-500">Couleurs: </span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {product.colors.map((color, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {color}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Modifier
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucun produit disponible</p>
                        <p className="text-gray-400 text-sm mt-2">Commencez par ajouter votre premier produit</p>
                    </div>
                )}
            </div>
        )
    }
