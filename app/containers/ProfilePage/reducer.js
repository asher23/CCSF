/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_PROFILE,
  SET_PROFILE_GUIDES,
  SET_PROFILE_CODELABS,
  SET_PROFILE_PAGE_STATE,
} from './constants';

export const initialState = {
  profile: {},
  profilePageState: '',
  guides: [],
  codeLabs: [],
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_PROFILE:
        draft.profile = action.profile;
        break;
      case SET_PROFILE_GUIDES:
        draft.guides = action.guides;
        break;
      case SET_PROFILE_CODELABS:
        draft.codeLabs = action.codeLabs;
        break;
      case SET_PROFILE_PAGE_STATE:
        draft.profilePageState = action.profilePageState;
        break;
    }
  });

export default profilePageReducer;
