import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from 'utils/api';
import history from 'utils/history';
import { selectFormState } from './selectors';

import { AUTHENTICATE, LOGIN_USER, LOGOUT_USER } from './constants';
import { setAuthStatus, setUser, setError } from './actions';

export default function* appSaga() {
  yield takeLatest(AUTHENTICATE, authenticate);
  yield takeLatest(LOGIN_USER, login);
  yield takeLatest(LOGOUT_USER, logout);
}

export function* authenticate() {
  try {
    yield put(setAuthStatus('authenticating'));
    const response = yield call(API.get, 'auth/isAuthenticated');
    if (response.status === 200) {
      console.log('whats resposne here', response);
      yield put(setUser(response.data));
      yield put(setAuthStatus('authenticated'));
    }
  } catch (e) {
    yield put(setAuthStatus(`unAuthenticated`));
    console.log('or is it this one');
    yield put(setError(e));
  }
}

export function* login() {
  const formState = yield select(selectFormState);
  try {
    yield put(setAuthStatus('authenticating'));
    const response = yield call(API.post, 'auth/login', formState);
    if (response.status === 200) {
      console.log('response', response);
      yield put(setUser(response.data));
      yield put(setAuthStatus('authenticated'));
      history.push('/profile');
    }
  } catch (e) {
    yield put(setAuthStatus(`error`));
    console.log('or osi this ', e);
    yield put(setError(e));
  }
}

export function* logout() {
  try {
    const response = yield call(API.post, 'auth/logout');
    if (response.status === 200) {
      yield put(setAuthStatus('unAuthenticated'));
      history.push('/');
    }
  } catch (e) {
    yield put(setAuthStatus(`error`));
    console.log('is this the erro being called');
    yield put(setError(e));
  }
}
