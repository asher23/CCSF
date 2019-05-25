/*
 *
 * GuidePage actions
 *
 */

import {
  SET_GUIDE,
  GET_GUIDE,
  SET_SECTION_DETAILS,
  SET_SECTION_TITLE,
  SET_EDIT_GUIDE,
  ADD_SECTION_TO_EDIT,
} from './constants';

export function setGuide(guide) {
  return {
    type: SET_GUIDE,
    guide,
  };
}
export function getGuide() {
  return {
    type: GET_GUIDE,
  };
}

export function setSectionDetails(id, details) {
  return {
    type: SET_SECTION_DETAILS,
    id,
    details,
  };
}
export function setSectionTitle(id, title) {
  return {
    type: SET_SECTION_TITLE,
    id,
    title,
  };
}

export function setEditGuide(editGuide) {
  return {
    type: SET_EDIT_GUIDE,
    editGuide,
  };
}

export function addSectionToEdit(section) {
  return {
    type: ADD_SECTION_TO_EDIT,
    section,
  };
}
