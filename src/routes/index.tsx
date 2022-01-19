import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import UnprotectedRoute from './unprotected';

function Routes() {
  return (
    <Router>
      <Switch>
        <UnprotectedRoute path="/" exact component={Home} />
        <UnprotectedRoute path="/cart" exact component={Cart} />
      </Switch>
    </Router>
  );
}

export default Routes;
