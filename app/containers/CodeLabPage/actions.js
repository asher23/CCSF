/*
 *
 * CodeLabPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_SIDEBAR_VIEW,
  SET_CODELAB,
  GET_CODELAB,
  UPDATE_CODELAB,
  SET_CODELAB_PAGE_STATE,
  APPLY_TO_CODELAB,
  ACCEPT_APPLICATION,
  REJECT_APPLICATION,
  GET_TEAM_LIST,
  SET_TEAM_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setSidebarView(sidebarView) {
  return {
    type: SET_SIDEBAR_VIEW,
    sidebarView,
  };
}

export function setCodeLab(codeLab) {
  return {
    type: SET_CODELAB,
    codeLab,
  };
}

export function getCodeLab(codeLabId) {
  return {
    type: GET_CODELAB,
    codeLabId,
  };
}

export function updateCodeLab(codeLabId, codeLab) {
  return {
    type: UPDATE_CODELAB,
    codeLabId,
    codeLab,
  };
}

export function setCodeLabPageState(codeLabPageState) {
  return {
    type: SET_CODELAB_PAGE_STATE,
    codeLabPageState,
  };
}

export function applyToCodeLab(codeLabId, application) {
  return {
    type: APPLY_TO_CODELAB,
    codeLabId,
    application,
  };
}

export function acceptApplication(codeLabId, applicantId) {
  return {
    type: ACCEPT_APPLICATION,
    codeLabId,
    applicantId,
  };
}

export function rejectApplication(codeLabId, applicantId) {
  return {
    type: REJECT_APPLICATION,
    codeLabId,
    applicantId,
  };
}

export function getTeamList(memberIds) {
  return {
    type: GET_TEAM_LIST,
    memberIds,
  };
}
export function setTeamList(teamList) {
  return {
    type: SET_TEAM_LIST,
    teamList,
  };
}
