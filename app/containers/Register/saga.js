import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import API from 'utils/api';

import { selectFormState } from './selectors';

import { REGISTER_USER } from './constants';
import { setRegisterStatus, setError } from './actions';

export function* register() {
  const formState = yield select(selectFormState);
  try {
    yield put(setRegisterStatus(''));
    yield call(API.post, '/auth/register', formState);
    yield put(setRegisterStatus('successful'));
  } catch (e) {
    yield put(setRegisterStatus('error'));
    yield put(setError(e));
  }
}

// Individual exports for testing
export default function* registerSaga() {
  yield takeLatest(REGISTER_USER, register);
}
