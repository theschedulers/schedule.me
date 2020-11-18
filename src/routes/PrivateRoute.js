import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  authenticated,
  initialized,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : !initialized ? (
          ''
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}
