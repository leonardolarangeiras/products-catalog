import { Route } from 'react-router-dom';

function UnprotectedRoute({ ...routeProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...routeProps} />;
}

export default UnprotectedRoute;
