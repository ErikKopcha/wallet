import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const isAuthenticated = true;
  console.log("ProtectedRoute: isAuthenticated", isAuthenticated);

  return (
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
        }
      />
  );
}

export default ProtectedRoute;
