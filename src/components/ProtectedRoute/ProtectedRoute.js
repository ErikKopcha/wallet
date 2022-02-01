// import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated, loading } = useSelector(state => state.auth);
  // if (loading) {
  //   return global spinner
  // }

  // wait login state
  const isUserAuthenticated = true;

  let location = useLocation();

  if (!isUserAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
