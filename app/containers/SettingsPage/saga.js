import { take, call, put, select, takeEvery, delay } from 'redux-saga/effects';
import API from 'utils/api';
import history from 'utils/history';
import { setUser } from 'containers/App/actions';
import { UPDATE_USER } from './constants';
import { setSettingsState } from './actions';

// Individual exports for testing
export default function* settingsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(UPDATE_USER, updateUser);
}

export function* updateUser({ userId, user }) {
  yield put(setSettingsState('loading'));
  try {
    const response = yield call(API.put, `/users/${userId}`, user);
    console.log("do u have anything to do with it")
    yield put(setUser(response.data));
    yield put(setSettingsState('successful'));
    yield delay(1300);
    yield put(setSettingsState('waiting'));
  } catch (e) {
    console.log('error from get profile', e);
  }
}
