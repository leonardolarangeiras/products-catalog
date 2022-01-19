import { createContext, ReactNode, useState } from 'react';

type Product = {
  id: string;
  name: string;
  image: string;
  price: string;
  stock: number;
  createdAt: string;
};

type ProductsCart = {
  product: Product;
  number: number;
};

interface ProductsContextType {
  productsInCart: ProductsCart[];
  // eslint-disable-next-line no-unused-vars
  setProductsInCart: (productsInCart: ProductsCart[]) => void;
}

interface ProductsProps {
  children: ReactNode;
}

const ProductsContext = createContext({} as ProductsContextType);

export function ProductsProvider({ children }: ProductsProps) {
  const [productsInCart, setProductsInCart] = useState<ProductsCart[]>([]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const providerValues = {
    productsInCart,
    setProductsInCart,
  };

  return (
    <ProductsContext.Provider value={providerValues}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContext;
