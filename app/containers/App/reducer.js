import produce from 'immer';
import { SET_USER, SET_AUTH_STATUS, LOGIN_USER, SET_ERROR } from './constants';

export const initialState = {
  user: {},
  authStatus: 'authenticating',
  formState: {
    username: '',
    password: '',
  },
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_USER:
        draft.formState.username = action.username;
        draft.formState.password = action.password;
        break;
      case SET_AUTH_STATUS:
        draft.authStatus = action.authStatus;
        break;
      case SET_USER:
        draft.user = action.user;
        break;
      case SET_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default appReducer;
