/**
 *
 * NavBar
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  Container,
} from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { login, logout } from './actions';
import { makeSelectAuthStatus, selectUser } from './selectors';

export function NavBar(props) {
  const { dispatch, authStatus, children, user } = props;

  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  // useEffect(() => {}, [user]);
  const navLinkStyle = {
    textDecoration: 'none',
    marginRight: '10px',
    // color: 'black',
  };
  const activeStyle = {
    fontWeight: 'bold',
    color: 'white',
  };
  // if (!user) return null;
  return (
    <Navbar
      fixed="top"
      style={{ height: '50px', marginBottom: '50px' }}
      bg="dark"
      variant="dark"
    >
      <Container style={{ backgroundColor: 'inherit' }}>
        <Navbar.Brand>
          <NavLink style={navLinkStyle} activeStyle={activeStyle} to="/home">
            FCSF
          </NavLink>
        </Navbar.Brand>
        <Nav className="mr-auto">
          {authStatus === 'authenticated' ? (
            <>
              <Nav.Item>
                <NavLink
                  style={navLinkStyle}
                  activeStyle={activeStyle}
                  to="/guides"
                >
                  Guides
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  activeStyle={activeStyle}
                  style={navLinkStyle}
                  to="/codeLabs"
                >
                  CodeLabs
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  activeStyle={activeStyle}
                  style={navLinkStyle}
                  to={`/profile/${user.id}`}
                >
                  Profile
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  activeStyle={activeStyle}
                  style={navLinkStyle}
                  to="/settings"
                >
                  Settings
                </NavLink>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <NavLink
                activeStyle={activeStyle}
                style={navLinkStyle}
                to="/register"
              >
                Register
              </NavLink>
            </Nav.Item>
          )}
        </Nav>

        {authStatus !== 'authenticated' ? (
          <Form onSubmit={e => onSubmit(e)} inline>
            <FormControl
              onChange={e => setUsername(e.target.value)}
              required
              type="text"
              name="username"
              className="mr-sm-2"
              placeholder="Enter username"
            />
            <FormControl
              onChange={e => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              className="mr-sm-2"
              placeholder="Enter password"
            />
            <Button name="login" type="submit">
              Login
            </Button>
          </Form>
        ) : (
          <Button
            name="logout"
            type="button"
            onClick={() => dispatch(logout())}
          >
            logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  children: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authStatus: makeSelectAuthStatus(),
  user: selectUser,
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

export default compose(withConnect)(NavBar);
