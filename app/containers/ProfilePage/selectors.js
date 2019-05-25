import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profilePage state domain
 */

const selectProfilePageDomain = state => state.profilePage || initialState;
const selectUserState = state => state.app.user;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfilePage
 */

const makeSelectProfilePage = () =>
  createSelector(
    selectProfilePageDomain,
    selectUserState,
    substate => substate,
  );

const makeSelectUser = () =>
  createSelector(
    selectUserState,
    subState => subState,
  );

export default makeSelectProfilePage;
export { selectProfilePageDomain, makeSelectUser };
