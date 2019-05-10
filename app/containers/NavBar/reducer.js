/*
 *
 * NavBar reducer
 *
 */
import produce from 'immer';
import {
  LOGIN_USER,
  SET_LOGIN_ERROR,
  SET_IS_LOGGED_IN,
  SET_AUTH_STATE,
  SET_USER,
} from './constants';

export const initialState = {
  formState: {
    username: '',
    password: '',
  },
  currentlySending: false,
  isLoggedIn: false,
  error: '',
  authState: '',
  user: {},
};

/* eslint-disable default-case, no-param-reassign */
const navBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_USER:
        draft.formState.username = action.username;
        draft.formState.password = action.password;
        break;
      case SET_LOGIN_ERROR:
        draft.error = action.error;
        break;
      case SET_IS_LOGGED_IN:
        draft.isLoggedIn = action.isLoggedIn;
        break;
      case SET_AUTH_STATE:
        draft.authState = action.authState;
        break;
      case SET_USER:
        draft.user = action.user;
    }
  });

export default navBarReducer;
