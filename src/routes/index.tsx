import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from '../screens/Home';
import UnprotectedRoute from './unprotected';

function Routes() {
  return (
    <Router>
      <Switch>
        <UnprotectedRoute path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default Routes;
