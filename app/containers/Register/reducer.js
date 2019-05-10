/*
 *
 * Register reducer
 *
 */
import produce from 'immer';
import { REGISTER_USER, SET_REGISTER_STATUS, SET_ERROR } from './constants';

export const initialState = {
  formState: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  registerStatus: 'fillingForm',
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const registerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REGISTER_USER:
        draft.formState = action.formState;
        break;
      case SET_REGISTER_STATUS:
        draft.registerStatus = action.registerStatus;
        break;
      case SET_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default registerReducer;
