import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import API from 'utils/api';

import { setGuides } from './actions';

import { selectGuideListInner } from './selectors';
import { GET_GUIDES } from './constants';

export function* getGuides() {
  const guideList = yield select(selectGuideListInner);
  try {
    const response = yield call(API.get, '/guides/5ccb3efa02d8166f253cd89a');
  } catch (e) {
    // yield put(setRegisterStatus('error'));
    // yield put(setError(e));
    console.log('error', e);
  }
}

// Individual exports for testing
export default function* guideListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_GUIDES, getGuides);
}
