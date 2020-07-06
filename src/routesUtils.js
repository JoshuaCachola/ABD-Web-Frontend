import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  exact,
  path,
  component: Component,
  needLogin,
  componentProps,
}) => (
  <Route
    exact={exact}
    path={path}
    render={(props) =>
      needLogin ? (
        <Component {...props} {...componentProps} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
