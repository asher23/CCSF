/*
 *
 * CodeLabPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SET_SIDEBAR_VIEW,
  SET_CODELAB,
  SET_CODELAB_PAGE_STATE,
  SET_TEAM_LIST,
} from './constants';

export const initialState = {
  sidebarView: '',
  codeLab: {},
  codeLabPageState: 'waiting',
  teamList: [],
};

/* eslint-disable default-case, no-param-reassign */
const codeLabPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_SIDEBAR_VIEW:
        draft.sidebarView = action.sidebarView;
        break;
      case SET_CODELAB:
        draft.codeLab = action.codeLab;
        break;
      case SET_CODELAB_PAGE_STATE:
        draft.codeLabPageState = action.codeLabPageState;
        break;
      case SET_TEAM_LIST:
        draft.teamList = action.teamList;
    }
  });

export default codeLabPageReducer;
