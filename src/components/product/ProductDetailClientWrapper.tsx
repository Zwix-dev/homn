import ProductDetail from './ProductDetail';
import { Product } from '@/types';

interface ProductDetailClientWrapperProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailClientWrapper: React.FC<ProductDetailClientWrapperProps> = ({
  product,
  onClose
}) => {

  
  if (!product) return null;

  return (
    <ProductDetail product={product} onClose={onClose} />
  );
};

export default ProductDetailClientWrapper;
