import { useEffect, useState, useContext } from 'react';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { DebounceInput } from 'react-debounce-input';
import { useHistory } from 'react-router-dom';
import products from '../../services';
import Pagination from '../../components/Pagination';
import ProductsContext from '../../contexts/ProductContext';
import ProductHomeItem from '../../components/ProductHomeItem';

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
  const { productsInCart } = useContext(ProductsContext);

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
            <Grid
              xl={3}
              md={6}
              sm={12}
              key={product.id}
              item
              alignItems="center"
            >
              <ProductHomeItem product={product} />
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
