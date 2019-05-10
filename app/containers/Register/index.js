/**
 *
 * Register
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Button, Container } from 'react-bootstrap';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import { registerUser, setRegisterStatus, setError } from './actions';

export function Register(props) {
  const { dispatch, register } = props;

  useInjectReducer({ key: 'register', reducer });
  useInjectSaga({ key: 'register', saga });

  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');
  const [email, setEmail] = useState('email');
  const [firstName, setFirstName] = useState('firstName');
  const [lastName, setLastName] = useState('lastName');

  useEffect(() => {});

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      registerUser({
        username,
        password,
        email,
        firstName,
        lastName,
      }),
    );
  };

  const returnForm = () => {
    return (
      <Container>
        <Form
          onSubmit={e => {
            onSubmit(e);
          }}
        >
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text name="password" className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              onChange={e => setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              onChange={e => setFirstName(e.target.value)}
              type="text"
              placeholder="Enter first name"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              onChange={e => setLastName(e.target.value)}
              type="text"
              placeholder="Enter last name "
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  };

  const onGoBack = () => {
    dispatch(setRegisterStatus('fillingForm'));
    dispatch(setError(null));
  };

  if (register.registerStatus === 'error' && register.error) {
    const { errors } = register.error.response.data;
    return (
      <div>
        <div>
          There was an error. Please fill out the form again. <br />
          <button type="button" onClick={() => onGoBack()}>
            Go back
          </button>
        </div>
        {Object.values(errors).map(errorArr => {
          return (
            <div>
              {errorArr.map(err => {
                return <p>{err}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
  if (register.registerStatus === 'fillingForm') {
    return returnForm();
  }
  if (register.registerStatus === 'successful') {
    return <div>You successfully registered. Please login above</div>;
  }
  return <div>Loading</div>;
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  register: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
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

export default compose(withConnect)(Register);
