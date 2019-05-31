/*
 *
 * CodeLabList actions
 *
 */

import {
  DEFAULT_ACTION,
  CREATE_CODELAB,
  GET_CODELABS,
  SET_CODELABS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function createCodeLab(codeLab) {
  return {
    type: CREATE_CODELAB,
    codeLab,
  };
}

export function getCodeLabs() {
  return {
    type: GET_CODELABS,
  };
}

export function setCodeLabs(codeLabs) {
  return {
    type: SET_CODELABS,
    codeLabs,
  };
}
