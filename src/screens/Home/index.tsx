import { useEffect, useState, useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Chip,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { DebounceInput } from 'react-debounce-input';
import { useHistory } from 'react-router-dom';
import products from '../../services';
import Pagination from '../../components/Pagination';
import ProductsContext from '../../contexts/ProductContext';

type Product = {
  id: string;
  name: string;
  image: string;
  price: string;
  stock: number;
  createdAt: string;
};

function Home() {
  const history = useHistory();
  const { productsInCart, setProductsInCart } = useContext(ProductsContext);

  const [productData, setProductData] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  const [page, setPage] = useState<number>(1);
  const [searchingProducts, setSearchingProducts] = useState<boolean>(false);

  const getProduct = async () => {
    const data = await products();
    if (data) setProductData(data);
  };

  const handleChangePagination = (newPage: number) => {
    const offset = newPage > 1 ? (newPage - 1) * 20 : 0;
    const nextPageProducts = productData.slice(offset, offset + 20);
    setProductList(nextPageProducts);
    setPage(newPage);
  };

  const addProductToCart = (product: Product) => {
    const inCart = productsInCart.findIndex(productInCart => {
      return productInCart.product.id === product.id;
    });

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

  const handleSearch = event => {
    const search = event.target.value.toUpperCase();

    if (search.length > 0) {
      setSearchingProducts(true);

      const filteredProducts = productList.filter(product => {
        const haveSearched = product.name.toUpperCase().indexOf(search);
        return haveSearched >= 0;
      });

      setProductList([...filteredProducts]);
    } else {
      setSearchingProducts(false);
      handleChangePagination(1);
    }
  };

  const productCard = (product: Product) => {
    // correção realizada pois a 'API' está retornando a URL sem o '.br'
    const urlImage = product.image.replace('.com', '.com.br');
    const inCart = productsInCart.findIndex(productInCart => {
      return productInCart.product.id === product.id;
    });

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
              addProductToCart(product);
            }}
          >
            add to cart
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
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <DebounceInput
            label="Search"
            debounceTimeout={300}
            onChange={handleSearch}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" fontSize="small" />
                </InputAdornment>
              ),
            }}
            size="small"
            element={TextField}
          />
        </Grid>

        <Grid item>
          <Button
            startIcon={<ShoppingCart />}
            disabled={productsInCart.length === 0}
            onClick={() => {
              history.push('/cart');
            }}
          >
            Cart
          </Button>
        </Grid>

        <Grid item>
          <Pagination
            page={page}
            disabled={searchingProducts}
            countProducts={productData.length}
            handleChangePagination={handleChangePagination}
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {productList &&
          productList.length > 0 &&
          productList.map(product => (
            <Grid xl={3} md={6} sm={12} item alignItems="center">
              {productCard(product)}
            </Grid>
          ))}
      </Grid>

      <Grid item container direction="row" justifyContent="flex-end">
        <Pagination
          page={page}
          disabled={searchingProducts}
          countProducts={productData.length}
          handleChangePagination={handleChangePagination}
        />
      </Grid>
    </Grid>
  );
}

export default Home;
