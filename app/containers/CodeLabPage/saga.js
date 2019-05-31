import { take, call, put, select, takeEvery, delay } from 'redux-saga/effects';
import API from 'utils/api';
import history from 'utils/history';
import { setCodeLab, setCodeLabPageState, setTeamList } from './actions';
import {
  GET_CODELAB,
  UPDATE_CODELAB,
  APPLY_TO_CODELAB,
  ACCEPT_APPLICATION,
  REJECT_APPLICATION,
  GET_TEAM_LIST,
} from './constants';
// Individual exports for testing
export default function* codeLabPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(GET_CODELAB, getCodeLab);
  yield takeEvery(UPDATE_CODELAB, updateCodeLab);
  yield takeEvery(APPLY_TO_CODELAB, applyToCodeLabSaga);
  yield takeEvery(ACCEPT_APPLICATION, acceptApplication);
  yield takeEvery(REJECT_APPLICATION, rejectApplication);
  yield takeEvery(GET_TEAM_LIST, getTeamList);
}

export function* getCodeLab({ codeLabId }) {
  console.log('r u running in get codelab');
  try {
    const response = yield call(API.get, `codeLabs/${codeLabId}`);
    yield put(setCodeLab(response.data));
    const responseTeamList = yield call(API.put, `users/getList`, response.data.memberIds);
    yield put(setTeamList(responseTeamList.data));
  } catch (e) {
    console.log(e);
  }
}

export function* updateCodeLab({ codeLabId, codeLab }) {
  yield put(setCodeLabPageState('loading'));
  try {
    const response = yield call(API.put, `codeLabs/${codeLabId}`, codeLab);
    yield put(setCodeLab(response.data));
    yield put(setCodeLabPageState('success'));
    yield delay(1300);
    yield put(setCodeLabPageState('waiting'));
  } catch (e) {
    console.log(e);
  }
}

export function* applyToCodeLabSaga({ codeLabId, application }) {
  yield put(setCodeLabPageState('loading'));
  try {
    const response = yield call(
      API.put,
      `codeLabs/${codeLabId}/apply`,
      application,
    );
    yield put(setCodeLab(response.data));
    yield put(setCodeLabPageState('success'));
    yield delay(1300);
    yield put(setCodeLabPageState('waiting'));
  } catch (e) {
    console.log(e);
  }
}

export function* acceptApplication({ codeLabId, applicantId }) {
  yield put(setCodeLabPageState('loading'));
  try {
    const response = yield call(
      API.put,
      `codeLabs/${codeLabId}/acceptApplication/${applicantId}`,
    );
    yield put(setCodeLab(response.data));
    yield put(setCodeLabPageState('success'));
    yield delay(1300);
    yield put(setCodeLabPageState('waiting'));
  } catch (e) {
    console.log(e);
  }
}

export function* rejectApplication({ codeLabId, applicantId }) {
  yield put(setCodeLabPageState('loading'));
  try {
    const response = yield call(
      API.put,
      `codeLabs/${codeLabId}/rejectApplication/${applicantId}`,
    );
    yield put(setCodeLab(response.data));
    yield put(setCodeLabPageState('success'));
    yield delay(1300);
    yield put(setCodeLabPageState('waiting'));
  } catch (e) {
    console.log(e);
  }
}
export function* getTeamList({ memberIds }) {
  yield put(setCodeLabPageState('loading'));
  try {
    // yield put(setCodeLabPageState('success'));
    // yield delay(1300);
    yield put(setCodeLabPageState('waiting'));
  } catch (e) {
    console.log(e);
  }
}
