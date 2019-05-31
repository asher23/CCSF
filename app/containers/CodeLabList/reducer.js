/*
 *
 * CodeLabList reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_CODELABS, SET_CODELABS } from './constants';

export const initialState = {
  codeLabs: [],
};

/* eslint-disable default-case, no-param-reassign */
const codeLabListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_CODELABS:
        draft.codeLabs = action.codeLabs;
        break;
    }
  });

export default codeLabListReducer;
