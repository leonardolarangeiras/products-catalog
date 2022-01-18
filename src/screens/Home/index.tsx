import { useEffect, useState, ChangeEvent } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Pagination,
  Grid,
  Fab,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import * as S from './styles';
import products from '../../services';

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

function Home() {
  const [productData, setProductData] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [productsInCart, setProductsInCart] = useState<ProductsCart[]>([]);
  const [page, setPage] = useState<number>(1);

  const getProduct = async () => {
    const data = await products();
    if (data) setProductData(data);
  };

  const handleChangePagination = (
    event: ChangeEvent<unknown>,
    value: number,
  ) => {
    const offset = value > 1 ? (value - 1) * 20 : 0;
    const nextPageProducts = productData.slice(offset, offset + 20);
    setProductList(nextPageProducts);
    setPage(value);
  };

  const productCard = product => {
    // correção realizada pois a 'API' está retornando a URL sem o '.br'
    const urlImage = product.image.replace('.com', '.com.br');

    return (
      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          component="img"
          height="140"
          image={urlImage}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setProductsInCart([...productsInCart, { product, number: 1 }]);
            }}
          >
            add to list
          </Button>
        </CardActions>
      </Card>
    );
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const firstProducts = productData.slice(0, 20);
    setProductList(firstProducts);
    setPage(1);
  }, [productData]);

  return (
    <>
      <S.DivHome>
        <Pagination
          count={Math.ceil(productData.length / 20)}
          page={page}
          onChange={handleChangePagination}
        />
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {productList &&
            productList.length > 0 &&
            productList.map(product => (
              <Grid xs={3} item alignItems="center">
                {productCard(product)}
              </Grid>
            ))}
        </Grid>
      </S.DivHome>
      {productsInCart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Fab onClick={() => console.log(productsInCart)} color="primary">
            <ShoppingCart />
          </Fab>
        </div>
      )}
    </>
  );
}

export default Home;
