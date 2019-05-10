/*
 *
 * NavBar actions
 *
 */

import {
  LOGIN_USER,
  SET_LOGIN_ERROR,
  LOGOUT_USER,
  SET_IS_LOGGED_IN,
  CHECK_USER_LOGGED_IN,
  SET_AUTH_STATE,
  SET_USER,
} from './constants';

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
    type: SET_LOGIN_ERROR,
    error,
  };
}

export function setIsLoggedIn(bool) {
  return {
    type: SET_IS_LOGGED_IN,
    isLoggedIn: bool,
  };
}

export function checkUserLoggedIn() {
  return {
    type: CHECK_USER_LOGGED_IN,
  };
}

export function setAuthState(authState) {
  return {
    type: SET_AUTH_STATE,
    authState,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}
