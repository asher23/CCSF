import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the codeLabPage state domain
 */

const selectCodeLabPageDomain = state => state.codeLabPage || initialState;
const selectUser = state => state.app.user || {};
/**
 * Other specific selectors
 */

/**
 * Default selector used by CodeLabPage
 */

const makeSelectCodeLabPage = () =>
  createSelector(
    selectCodeLabPageDomain,
    substate => substate,
  );

const makeSelectUser = () =>
  createSelector(
    selectUser,
    substate => substate,
  );

export default makeSelectCodeLabPage;
export { selectCodeLabPageDomain, makeSelectUser };
