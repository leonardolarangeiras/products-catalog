import Home from '../screens/Home'
import UnprotectedRoute from './unprotected'
import { BrowserRouter as Router, Switch } from 'react-router-dom';

const Routes = () => {
  return(
    <Router>
      <Switch>
        <UnprotectedRoute path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default Routes;