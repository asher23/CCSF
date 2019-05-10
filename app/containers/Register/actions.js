/*
 *
 * Register actions
 *
 */

import { REGISTER_USER, SET_REGISTER_STATUS, SET_ERROR } from './constants';

export function registerUser(formState) {
  return {
    type: REGISTER_USER,
    formState,
  };
}

export function setRegisterStatus(registerStatus) {
  return {
    type: SET_REGISTER_STATUS,
    registerStatus,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}
