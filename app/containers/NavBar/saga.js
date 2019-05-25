import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import API from 'utils/api';
import history from 'utils/history';
import { selectFormState } from './selectors';

import { LOGIN_USER, LOGOUT_USER, CHECK_USER_LOGGED_IN } from './constants';
import { setError, setIsLoggedIn, setAuthState, setUser } from './actions';

// Individual exports for testing
export default function* navBarSaga() {
  yield takeLatest(LOGIN_USER, login);
  yield takeLatest(LOGOUT_USER, logout);
  yield takeLatest(CHECK_USER_LOGGED_IN, checkUserLoggedIn);
}



export function* checkUserLoggedIn() {
  try {
    const response = yield call(API.get, 'auth/isAuthenticated');
    if (response.status === 200) yield put(setIsLoggedIn(true));
    console.log('response', response);
    yield put(setUser(response.data));
    // history.push('/');
  } catch (e) {
    yield put(setIsLoggedIn(false));
    yield put(setError(e));
  }
}
