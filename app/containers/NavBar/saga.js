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

export function* login() {
  const formState = yield select(selectFormState);
  try {
    yield put(setAuthState('inProgress'));
    const response = yield call(API.post, 'auth/login', formState);
    if (response.status === 200) {
      yield put(setIsLoggedIn(true));
      console.log('resposne', response);
      yield put(setUser(response.data));
      history.push('/profile');
    }
  } catch (err) {
    yield put(setError(err));
  }
}

export function* logout() {
  try {
    const response = yield call(API.post, 'auth/logout');
    yield put(setIsLoggedIn(false));
    history.push('/');
  } catch (err) {
    yield put(setError(err));
  }
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
