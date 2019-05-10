import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the register state domain
 */

const selectRegisterDomain = state => state.register || initialState;
const selectFormState = state => state.register.formState;
const selectRegisterStatus = state => state.register.registerStatus;
/**
 * Other specific selectors
 */

/**
 * Default selector used by Register
 */

const makeSelectRegister = () =>
  createSelector(
    selectRegisterDomain,
    substate => substate,
  );

export default makeSelectRegister;
export { selectRegisterDomain, selectFormState, selectRegisterStatus };
