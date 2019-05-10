/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import ProfilePage from 'containers/ProfilePage';
import RegisterPage from 'containers/Register';
import GuideList from 'containers/GuideList';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { connect, use } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import GlobalStyle from '../../global-styles';
import NavBar from '../NavBar';
// import { makeSelectIsLoggedIn, makeSelectLocation } from './selectors';

export function App({ isLoggedIn, location }) {
  // console.log(' u r in the happome page', props);
  // useInjectReducer({ key: 'navBar', reducer });

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: location } }} />
        )
      }
    />
  );

  return (
    <div>
      {/* <NavBar />
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/guides" component={GuideList} />
            <Route exact path="/profile" component={ProfilePage} />
          </>
        ) : (
          <Route exact path="/register" component={RegisterPage} />
        )}
        <Route exact path="/home" component={HomePage} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle /> */}
      <NavBar />
      <Switch>
        <Route exact path="/guides" component={GuideList} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/home" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

// App.propTypes = {
//   isLoggedIn: PropTypes.bool,
// };

const mapStateToProps = state => {
  return {
    isLoggedIn: state.navBar && state.navBar.isLoggedIn,
  };
};
// //
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
