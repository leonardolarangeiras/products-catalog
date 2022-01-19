import { ShoppingCart } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from '@mui/material';
import { useContext } from 'react';
import ProductsContext from '../../contexts/ProductContext';

type Product = {
  id: string;
  name: string;
  image: string;
  price: string;
  stock: number;
  createdAt: string;
};

type ProductHomeItemProps = {
  product: Product;
};

function ProductHomeItem({ product }: ProductHomeItemProps) {
  // correção realizada pois a 'API' está retornando a URL sem o '.br'
  const urlImage = product.image.replace('.com', '.com.br');

  const { productsInCart, setProductsInCart } = useContext(ProductsContext);

  const inCart = productsInCart.findIndex(productInCart => {
    return productInCart.product.id === product.id;
  });

  const addProductToCart = () => {
    if (inCart >= 0) {
      const newProductsInCart = productsInCart.map(productInCart => {
        return productInCart.product.id === product.id
          ? { ...productInCart, number: productInCart.number + 1 }
          : productInCart;
      });
      setProductsInCart([...newProductsInCart]);
    } else {
      setProductsInCart([...productsInCart, { product, number: 1 }]);
    }
  };

  return (
    <Card sx={{ minWidth: 350 }}>
      <CardMedia
        component="img"
        height="200"
        image={urlImage}
        alt={product.name}
      />
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">{product.name}</Typography>
          {inCart >= 0 && (
            <Chip
              icon={<ShoppingCart fontSize="small" />}
              label={productsInCart[inCart].number}
            />
          )}
        </div>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`$ ${product.price}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            addProductToCart();
          }}
        >
          add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductHomeItem;
