import ProductDetail from './ProductDetail';
import { Product } from '@/types';

interface ProductDetailClientWrapperProps {
  product: Product | null;
  onClose: () => void;
  isFav?: boolean; // Optional prop to indicate if the product is a favorite
}

const ProductDetailClientWrapper: React.FC<ProductDetailClientWrapperProps> = ({
  product,
  onClose,
  isFav
}) => {

  
  if (!product) return null;

  return (
    <ProductDetail product={product} onClose={onClose} isFav={isFav} />
  );
};

export default ProductDetailClientWrapper;
