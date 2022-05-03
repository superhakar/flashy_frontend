import React from "react";
import { Route, Redirect } from "react-router-dom";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem("jwt");
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
