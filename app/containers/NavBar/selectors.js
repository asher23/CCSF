import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the navBar state domain
 */

const selectNavBarDomain = state => state.navBar || initialState;
const selectFormState = state => state.navBar.formState;
/**
 * Other specific selectors
 */

/**
 * Default selector used by NavBar
 */

const makeSelectNavBar = () =>
  createSelector(
    selectNavBarDomain,
    substate => substate,
  );

export default makeSelectNavBar;
export { selectNavBarDomain, selectFormState };
