/**
 *
 * CodeLabPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Loading from 'components/Loading';
import ProtectedRoute from 'components/ProtectedRoute';
import './styles.css';
import makeSelectCodeLabPage, { makeSelectUser } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { setSidebarView, getCodeLab } from './actions';
import AboutTeam from './AboutTeam';
import Goal from './Goal';
import EditCodeLab from './EditCodeLab';
import Joining from './Joining';
import Chat from './Chat';
import TaskManager from './TaskManager';
import ViewTeam from './ViewTeam';
import LookingFor from './LookingFor';
import Comments from './Comments';

export function CodeLabPage({ dispatch, codeLabPage, match, user }) {
  useInjectReducer({ key: 'codeLabPage', reducer });
  useInjectSaga({ key: 'codeLabPage', saga });

  // console.log('disaptch in codelagpage', user);

  const [authStatus, setAuthStatus] = useState('loading');
  const { id, memberIds, goal, lookingFor, aboutTeam } = codeLabPage.codeLab;
  // console.log(codeLabPage);

  useEffect(() => {
    dispatch(getCodeLab(match.params.id));
  }, []);

  useEffect(() => {
    // setAuthStatus('authenticated');
    if (memberIds) {
      if (memberIds.indexOf(user.id) > -1) {
        setAuthStatus('authenticated');
      } else {
        setAuthStatus('unauthenticaed');
      }
    }
  }, [user, codeLabPage.codeLab]);

  const linkStyle = {
    marginLeft: '7px',
    marginBottom: '25px',
    display: 'block',
    // color: '#343a40',
  };
  const activeLinkStyle = {
    color: 'white',
  };

  const renderRoutes = () => {
    const { codeLabPageState } = codeLabPage;
    if (codeLabPageState === 'loading' || authStatus === 'loading')
      return <Loading />;
    if (codeLabPageState === 'success') return <h1>Success!!!!!</h1>;
    if (codeLabPageState === 'waiting') {
      return (
        <Switch>
          <Route
            exact
            path="/codeLabs/:id/goal"
            render={() => <Goal goal={goal} authStatus={authStatus} />}
          />
          <Route exact path="/codeLabs/:id/aboutTeam" component={AboutTeam} />
          <ProtectedRoute
            authStatus={authStatus}
            exact
            path="/codeLabs/:id/editCodeLab"
            component={EditCodeLab}
          />
          <ProtectedRoute
            authStatus={authStatus}
            exact
            path="/codeLabs/:id/chat"
            component={Chat}
          />
          <ProtectedRoute
            authStatus={authStatus}
            exact
            path="/codeLabs/:id/taskManager"
            component={TaskManager}
          />
          <ProtectedRoute
            authStatus={authStatus}
            exact
            path="/codeLabs/:id/viewTeam"
            component={ViewTeam}
          />
          <Route
            exact
            path="/codeLabs/:id/joining"
            render={() => <Joining authStatus={authStatus} />}
          />
          <Route
            exact
            path="/codeLabs/:id/lookingFor"
            render={() => (
              <LookingFor lookingFor={lookingFor} authStatus={authStatus} />
            )}
          />
          <Route
            exact
            path="/codeLabs/:id/comments"
            render={() => <Comments authStatus={authStatus} />}
          />
          {/* <Route exact path="/codeLabs/randy/joining" component={null} />
        <Route exact path="/codeLabs/randy/comments" component={null} /> */}
          {/* <Route exact path="/codeLabs/randy/chat" component={null} /> */}
        </Switch>
      );
    }
  };
  return (
    <>
      <div className="sidenav">
        <NavLink
          activeStyle={activeLinkStyle}
          style={linkStyle}
          to={`/codeLabs/${id}/goal`}
        >
          Goal
        </NavLink>
        <NavLink
          activeStyle={activeLinkStyle}
          style={linkStyle}
          to={`/codeLabs/${id}/aboutTeam`}
        >
          About The Team
        </NavLink>
        <NavLink
          activeStyle={activeLinkStyle}
          style={linkStyle}
          to={`/codeLabs/${id}/lookingFor`}
        >
          Looking For
        </NavLink>
        <NavLink
          activeStyle={activeLinkStyle}
          style={linkStyle}
          to={`/codeLabs/${id}/joining`}
        >
          How to apply
        </NavLink>
        <NavLink
          activeStyle={activeLinkStyle}
          style={linkStyle}
          to={`/codeLabs/${id}/comments`}
        >
          Comments
        </NavLink>
        {authStatus === 'authenticated' && (
          <>
            <NavLink
              activeStyle={activeLinkStyle}
              style={linkStyle}
              to={`/codeLabs/${id}/chat`}
            >
              Team Chat
            </NavLink>
            <NavLink
              activeStyle={activeLinkStyle}
              style={linkStyle}
              to={`/codeLabs/${id}/viewTeam`}
            >
              View Team
            </NavLink>
            <NavLink
              activeStyle={activeLinkStyle}
              style={linkStyle}
              to={`/codeLabs/${id}/editCodeLab`}
            >
              Edit CodeLab
            </NavLink>
            <NavLink
              activeStyle={activeLinkStyle}
              style={linkStyle}
              to={`/codeLabs/${id}/taskManager`}
            >
              Task Manager
            </NavLink>
          </>
        )}
      </div>
      <div
        style={{
          marginLeft: '200px',
          backgroundColor: 'rgb(239, 247, 212, 0.4)',
          height: '100%',
        }}
      >
        {renderRoutes()}
      </div>
    </>
  );
}

CodeLabPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  codeLabPage: makeSelectCodeLabPage(),
  user: makeSelectUser(),
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

export default compose(withConnect)(CodeLabPage);
