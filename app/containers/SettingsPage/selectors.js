import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingsPage state domain
 */

const selectSettingsPageDomain = state => state.settingsPage || initialState;
const selectApp = state => state.app;
/**
 * Other specific selectors
 */

/**
 * Default selector used by SettingsPage
 */

const makeSelectSettingsPage = () =>
  createSelector(
    selectSettingsPageDomain,
    substate => substate,
  );

const makeSelectApp = () =>
  createSelector(
    selectApp,
    subState => subState,
  );
export default makeSelectSettingsPage;
export { selectSettingsPageDomain, makeSelectApp };
