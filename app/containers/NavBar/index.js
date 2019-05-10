/**
 *
 * NavBar
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import makeSelectNavBar from './selectors';
import reducer from './reducer';
import saga from './saga';
import { login, logout, checkUserLoggedIn } from './actions';

export function NavBar(props) {
  const { dispatch, navBar } = props;

  useInjectReducer({ key: 'navBar', reducer });
  useInjectSaga({ key: 'navBar', saga });

  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  useEffect(() => {
    dispatch(checkUserLoggedIn());
  }, []);

  const navLinkStyle = {
    textDecoration: 'none',
    marginRight: '10px',
    color: 'white',
  };
  const activeStyle = {
    fontWeight: 'bold',
    color: 'red',
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <NavLink style={navLinkStyle} activeStyle={activeStyle} to="/home">
          FCSF
        </NavLink>
      </Navbar.Brand>
      <Nav className="mr-auto">
        {navBar.isLoggedIn ? (
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
                to="/profile"
              >
                Profile
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

      {!navBar.isLoggedIn ? (
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
        <Button name="logout" type="button" onClick={() => dispatch(logout())}>
          logout
        </Button>
      )}
    </Navbar>
  );
}

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navBar: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  navBar: makeSelectNavBar(),
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
