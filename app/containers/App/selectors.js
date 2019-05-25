import { createSelector } from 'reselect';
import { initialState } from './reducer';
// const selectRouter = state => state.router || initialState;
const selectApp = state => state.app || initialState;
const selectAuthStatus = state => state.app.authStatus || 'unAuthenticated';
const selectFormState = state => state.app.formState;
// const makeSelectLocation = () =>
//   createSelector(
//     selectIsLoggedIn,
//     // routerState => routerState.location,
//   );

const makeSelectAuthStatus = () =>
  createSelector(
    selectApp,
    subState => subState.authStatus,
  );

// const makeSelectIsLoggedIn = () => createSelector(selectIsLoggedIn, );

export { makeSelectAuthStatus, selectAuthStatus, selectFormState };
