import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProtectedRoute({
  component: Component,
  authStatus,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authStatus === 'authenticated' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home' }} />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.object,
  authStatus: PropTypes.string,
};
