/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import HomePage from 'containers/HomePage/Loadable';
import ProfilePage from 'containers/ProfilePage';
import GuidePage from 'containers/GuidePage';
import EditGuidePage from 'containers/GuidePage/EditGuide';
import RegisterPage from 'containers/Register';
import { createStructuredSelector } from 'reselect';
import GuideList from 'containers/GuideList';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Loading from 'components/Loading';
import SettingsPage from 'containers/SettingsPage';

import { connect } from 'react-redux';
import { compose } from 'redux';
import GlobalStyle from '../../global-styles';
import NavBar from './NavBar';
import reducer from './reducer';
import saga from './saga';
import { authenticate } from './actions';
import ProtectedRoute from './ProtectedRoute';
import { makeSelectAuthStatus } from './selectors';
export function App(props) {
  const { dispatch, authStatus } = props;

  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    dispatch(authenticate());
  }, []);

  if (authStatus === 'authenticating') {
    return <Loading />;
  }
  if (authStatus === 'error') {
    return (
      <div>
        <h1>THERE WAS AN ERROR. PLEASE TRY AGAIN. </h1>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '50px' }}>
        <Switch>
          <ProtectedRoute
            authStatus={authStatus}
            exact
            path="/guides/:id/edit"
            component={EditGuidePage}
          />
          <ProtectedRoute
            authStatus={authStatus}
            exact
            path="/settings"
            component={SettingsPage}
          />
          <Route exact path="/guides/:id" component={GuidePage} />
          <Route exact path="/guides" component={GuideList} />
          <Route path="/profile/:id" component={ProfilePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authStatus: makeSelectAuthStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
