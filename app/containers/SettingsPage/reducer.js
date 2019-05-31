/*
 *
 * SettingsPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_SETTINGS_STATE } from './constants';

export const initialState = {
  settingsState: '',
};

/* eslint-disable default-case, no-param-reassign */
const settingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_SETTINGS_STATE:
        draft.settingsState = action.settingsState;
    }
  });

export default settingsPageReducer;
