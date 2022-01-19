import {
  Avatar,
  Grid,
  IconButton,
  Typography,
  ButtonGroup,
  Button,
} from '@mui/material';
import { Delete, Remove, Add } from '@mui/icons-material';
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

type ProductCardType = {
  number: number;
  product: Product;
};

function ProductCartItem({ number, product }: ProductCardType) {
  // correção realizada pois a 'API' está retornando a URL sem o '.br'
  const urlImage = product.image.replace('.com', '.com.br');
  const totalValue = number * parseFloat(product.price);

  const { productsInCart, setProductsInCart } = useContext(ProductsContext);

  const handleRemoveProduct = () => {
    const newProductsInCart = productsInCart.filter(productInCart => {
      return productInCart.product.id !== product.id;
    });

    setProductsInCart([...newProductsInCart]);
  };

  const handleChangeQuantity = (type: string) => {
    const newProductsInCart = productsInCart
      .map(productInCart => {
        let productInCartCopy = { ...productInCart };

        if (productInCartCopy.product.id === product.id) {
          if (type === 'add') {
            productInCartCopy.number += 1;
          } else if (productInCartCopy.number > 1) {
            productInCartCopy.number -= 1;
          } else {
            productInCartCopy = null;
          }
        }

        return productInCartCopy;
      })
      .filter(productInCart => productInCart);

    setProductsInCart([...newProductsInCart]);
  };

  return (
    <Grid
      item
      container
      spacing={2}
      direction="row"
      alignItems="center"
      style={{ height: '60px' }}
      justifyContent="space-between"
    >
      <Grid
        item
        container
        spacing={2}
        direction="row"
        alignItems="center"
        xs={5}
      >
        <Grid item>
          <Avatar alt={product.name} src={urlImage} />
        </Grid>
        <Grid item>
          <Typography>{product.name}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <Typography>{`Value: $ ${product.price} x ${number} UN`}</Typography>
      </Grid>

      <Grid
        item
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        xs={4}
      >
        <Grid item xs={2}>
          <Typography>Total:</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography>{`$ ${totalValue.toFixed(2)}`}</Typography>
        </Grid>

        <Grid
          item
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          xs={4}
        >
          <Grid item>
            <ButtonGroup>
              <Button
                onClick={() => {
                  handleChangeQuantity('remove');
                }}
              >
                <Remove fontSize="small" />
              </Button>
              <Button
                onClick={() => {
                  handleChangeQuantity('add');
                }}
              >
                <Add fontSize="small" />
              </Button>
            </ButtonGroup>
          </Grid>

          <Grid item>
            <IconButton
              onClick={() => {
                handleRemoveProduct();
              }}
            >
              <Delete color="error" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductCartItem;
