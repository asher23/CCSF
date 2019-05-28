import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import API from 'utils/api';
import history from 'utils/history';

import { setGuides } from './actions';
import { setGuide } from '../GuidePage/actions';

import { selectGuideListInner, selectCreateGuideForm } from './selectors';
import { GET_GUIDES, CREATE_GUIDE } from './constants';

// Individual exports for testing
export default function* guideListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_GUIDES, getGuides);
  yield takeLatest(CREATE_GUIDE, createGuide);
}

export function* getGuides() {
  try {
    const response = yield call(API.get, '/guides');
    yield put(setGuides(response.data));
  } catch (e) {
    // yield put(setRegisterStatus('error'));
    // yield put(setError(e));
    console.log('error', e);
  }
}

export function* createGuide() {
  const createGuideForm = yield select(selectCreateGuideForm);
  try {
    const response = yield call(API.post, '/guides', createGuideForm);
    if (response.status === 201) {
      history.push(`/guides/${response.data.id}`);
      console.log('guideadta', response);
    }
  } catch (e) {
    // yield put(setRegisterStatus('error'));
    // yield put(setError(e));
    console.log('error', e);
  }
  console.log('create guide form', createGuideForm);
}
