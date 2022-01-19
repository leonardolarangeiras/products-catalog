import { ReactNode } from 'react';

import { ProductsProvider } from './ProductContext';

interface ContextProviderProps {
  children: ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  return <ProductsProvider>{children}</ProductsProvider>;
}

export default ContextProvider;
