import {
  take,
  call,
  put,
  select,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import API from 'utils/api';
import history from 'utils/history';
import {
  GET_PROFILE,
  GET_PROFILE_GUIDES,
  GET_PROFILE_CODELABS,
} from './constants';
import { selectProfileId } from './selectors';
import { setProfileGuides, setProfileCodeLabs, setProfile } from './actions';

// Individual exports for testing
export default function* profilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(GET_PROFILE, getProfile);
  yield takeEvery(GET_PROFILE_GUIDES, getProfileGuides);
}

export function* getProfile() {
  const profileId = yield select(selectProfileId);
  try {
    const response = yield call(API.get, `/users/${profileId}`);
    yield put(setProfile(response.data));
  } catch (e) {
    console.log('error from get profile', e);
  }
}

export function* getProfileGuides() {
  const profileId = yield select(selectProfileId);
  try {
    const response = yield call(API.get, `/guides/profile/${profileId}`);
    yield put(setProfileGuides(response.data));
  } catch (e) {
    console.log('error from get profile', e);
  }
}

// export function* getProfileCodeLabs() {
//   const profileId = yield select(selectProfileId);
//   try {
//     const response = yield call(API.get, `/users/${profileId}`);
//     yield put(setProfile(response.data));
//   } catch (e) {
//     console.log('error from get profile', e);
//   }
// }
