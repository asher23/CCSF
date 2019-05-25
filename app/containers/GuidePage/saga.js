import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import API from 'utils/api';
import history from 'utils/history';

import { GET_GUIDE } from './constants';
import { setGuide, setEditGuide } from './actions';
import { selectGuideId } from './selectors';
// Individual exports for testing
export default function* guidePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_GUIDE, getGuide);
}

export function* getGuide() {
  const guideId = yield select(selectGuideId);
  try {
    const response = yield call(API.get, `/guides/${guideId}`);
    console.log('response', response);
    yield put(setGuide(response.data));
    yield put(setEditGuide(response.data));
  } catch (e) {
    console.log('error from get guide', e);
  }
}
