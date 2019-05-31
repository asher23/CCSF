import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import API from 'utils/api';
import history from 'utils/history';
import { setCodeLab } from 'containers/CodeLabPage/actions';
import { CREATE_CODELAB, GET_CODELABS } from './constants';
import { setCodeLabs } from './actions';
// Individual exports for testing
export default function* codeLabListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(CREATE_CODELAB, createCodeLab);
  yield takeEvery(GET_CODELABS, getCodeLabs);
}

export function* createCodeLab({ codeLab }) {
  try {
    const response = yield call(API.post, 'codeLabs', codeLab);
    yield put(setCodeLab(response.data));
    history.push(`/codeLabs/${response.data.id}`);
  } catch (e) {
    console.log(e);
  }
}
export function* getCodeLabs() {
  try {
    const response = yield call(API.get, 'codeLabs');
    yield put(setCodeLabs(response.data));
  } catch (e) {
    console.log(e);
  }
}
