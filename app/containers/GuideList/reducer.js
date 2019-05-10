/*
 *
 * GuideList reducer
 *
 */
import produce from 'immer';
import { SET_GUIDES, GET_GUIDES } from './constants';

export const initialState = {
  guides: [],
};

/* eslint-disable default-case, no-param-reassign */
const guideListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_GUIDES:
        draft.guides = action.guides;
        break;
      case GET_GUIDES:
        break;
    }
  });

export default guideListReducer;
