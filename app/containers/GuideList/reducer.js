/*
 *
 * GuideList reducer
 *
 */
import produce from 'immer';
import { SET_GUIDES, GET_GUIDES, CREATE_GUIDE } from './constants';

export const initialState = {
  guides: [],
  createGuideForm: {
    title: '',
    description: '',
  },
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
      case CREATE_GUIDE:
        draft.createGuideForm = action.createGuideForm;
    }
  });

export default guideListReducer;
