import {
  SET_AUTH_STATUS,
  SET_USER,
  AUTHENTICATE,
  LOGIN_USER,
  LOGOUT_USER,
  SET_ERROR,
} from './constants';

export function setAuthStatus(authStatus) {
  return {
    type: SET_AUTH_STATUS,
    authStatus,
  };
}

export function authenticate() {
  return {
    type: AUTHENTICATE,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function login(username, password) {
  return {
    type: LOGIN_USER,
    username,
    password,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}
