import { Route } from 'react-router-dom';

const UnprotectedRoute = ({ ...routeProps }) => <Route {...routeProps} />;

export default UnprotectedRoute;
