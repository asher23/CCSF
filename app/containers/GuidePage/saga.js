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

import { GET_GUIDE, UPDATE_GUIDE, DELETE_GUIDE } from './constants';
import { setGuide, setEditGuide } from './actions';
import { selectGuideId, selectEditGuide } from './selectors';
// Individual exports for testing
export default function* guidePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_GUIDE, getGuide);
  yield takeLatest(UPDATE_GUIDE, updateGuideSaga);
  yield takeEvery(DELETE_GUIDE, deleteGuideSaga);
}

export function* getGuide() {
  const guideId = yield select(selectGuideId);
  try {
    const response = yield call(API.get, `/guides/${guideId}`);
    console.log('respgdggonse', response);
    const guide = response.data;
    console.log('guidesectiosn before', guide.sections);
    guide.sections = guide.sections.map(section => ({
      ...section,
      details: JSON.parse(section.details),
    }));
    console.log('guide.sections', guide.sections);
    yield put(setGuide(response.data));
    yield put(setEditGuide(response.data));
  } catch (e) {
    console.log('error from get guide', e);
  }
}

export function* updateGuideSaga() {
  const guideId = yield select(selectGuideId);
  const editGuide = yield select(selectEditGuide);
  const stringSections = editGuide.sections.map(currSection => ({
    ...currSection,
    details: JSON.stringify(currSection.details),
  }));
  const editGuideCopy = { ...editGuide, sections: stringSections };
  // let formData;
  // editGuideCopy.photos = editGuideCopy.photos.map(photo => {
  //   formData = new FormData();
  //   formData.append('image', photo);
  //   return {};
  // });
  console.log('editGuideCopy', editGuideCopy);
  try {
    const response = yield call(API.put, `/guides/${guideId}`, editGuideCopy);
    history.push(`/guides/${response.data.id}`);
  } catch (e) {
    console.log('error get update guide', e);
  }
}

export function* deleteGuideSaga() {
  const guideId = yield select(selectGuideId);
  console.log('ur here');

  try {
    yield call(API.delete, `/guides/${guideId}`);
    history.push(`/guides`);
  } catch (e) {
    console.log('error');
  }
}
