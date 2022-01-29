import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const isAuthenticated = true;
  console.log("ProtectedRoute: isAuthenticated", isAuthenticated);

  return (
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/register" /> // wait login page
        }
      />
  );
}

export default ProtectedRoute;
