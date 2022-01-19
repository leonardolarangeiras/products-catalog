import { Home } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ProductsContext from '../../contexts/ProductContext';
import ProductCartItem from '../../components/ProductCartItem';

function Cart() {
  const history = useHistory();
  const { productsInCart } = useContext(ProductsContext);

  const totalCart = productsInCart
    .map(({ number, product }) => {
      return parseFloat(product.price) * number;
    })
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ height: '100%' }}
    >
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Button
            startIcon={<Home />}
            onClick={() => {
              history.push('/');
            }}
          >
            Home
          </Button>
        </Grid>
      </Grid>

      <Grid
        item
        container
        spacing={4}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid xs={8} item container justifyContent="center" spacing={4}>
          <Grid item>
            <Typography variant="h5">Products in cart</Typography>
          </Grid>

          <Grid item container direction="column">
            {productsInCart.length > 0 &&
              productsInCart.map(({ number, product }) => (
                <ProductCartItem number={number} product={product} />
              ))}
          </Grid>

          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Total cart</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5">{`$ ${totalCart}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Cart;
