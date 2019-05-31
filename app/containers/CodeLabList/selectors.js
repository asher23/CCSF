import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the codeLabList state domain
 */

const selectCodeLabListDomain = state => state.codeLabList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CodeLabList
 */

const makeSelectCodeLabList = () =>
  createSelector(
    selectCodeLabListDomain,
    substate => substate,
  );

export default makeSelectCodeLabList;
export { selectCodeLabListDomain };
