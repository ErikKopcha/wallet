import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * @param { function() } Component
 * @param { String } location
 * @returns { (function(*): *)|* }
 */
const withAuthRedirect = (Component, { location = '/home/' }) => {
  const WithAuthRedirectWrapper = props => {
    const isAuth = useSelector((state) => state.session.isAuth);

    if (isAuth) return <Navigate to={location} />

    return <Component {...props} />;
  };

  return WithAuthRedirectWrapper;
}

export default withAuthRedirect;
