import { Avatar, Grid, Typography } from '@mui/material';

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
  return (
    <Grid
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
        xs={6}
      >
        <Grid item>
          <Avatar alt={product.name} src={urlImage} />
        </Grid>
        <Grid item>
          <Typography>{product.name}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={5}>
        <Typography>{`$ ${product.price} x ${number} un`}</Typography>
      </Grid>

      <Grid
        item
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        xs={1}
      >
        <Grid item>
          <Typography>Total $</Typography>
        </Grid>
        <Grid item>
          <Typography>{totalValue.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductCartItem;
