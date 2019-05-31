/*
 *
 * SettingsPage actions
 *
 */

import { DEFAULT_ACTION, UPDATE_USER, SET_SETTINGS_STATE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateUser(userId, user) {
  return {
    type: UPDATE_USER,
    userId,
    user,
  };
}
export function setSettingsState(settingsState) {
  return {
    type: SET_SETTINGS_STATE,
    settingsState,
  };
}
