import * as S from './styles';
import { getProducts } from '../../services';

function Home() {
  return <S.DivHome>{getProducts()}</S.DivHome>;
}

export default Home;
