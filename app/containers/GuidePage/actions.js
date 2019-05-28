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
  SET_SECTION_PHOTOS,
  SET_EDIT_GUIDE,
  ADD_SECTION_TO_EDIT,
  UPDATE_GUIDE,
  SET_EDIT_GUIDE_TITLE,
  SET_EDIT_GUIDE_DESCRIPTION,
  SET_EDIT_GUIDE_PHOTOS,
  DELETE_PHOTO_FROM_SECTION,
  DELETE_PHOTO_FROM_GUIDE,
  DELETE_SECTION,
  DELETE_GUIDE,
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

export function setSectionDetails(index, details) {
  return {
    type: SET_SECTION_DETAILS,
    index,
    details,
  };
}
export function setSectionTitle(index, title) {
  return {
    type: SET_SECTION_TITLE,
    index,
    title,
  };
}

export function setSectionPhotos(index, photos) {
  return {
    type: SET_SECTION_PHOTOS,
    index,
    photos,
  };
}

export function setEditGuideTitle(title) {
  return {
    type: SET_EDIT_GUIDE_TITLE,
    title,
  };
}
export function setEditGuideDescription(description) {
  return {
    type: SET_EDIT_GUIDE_DESCRIPTION,
    description,
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

export function updateGuide() {
  return {
    type: UPDATE_GUIDE,
  };
}

export function setEditGuidePhotos(photos) {
  return {
    type: SET_EDIT_GUIDE_PHOTOS,
    photos,
  };
}

export function deletePhotoFromSection(sectionIndex, photoIndex) {
  return {
    type: DELETE_PHOTO_FROM_SECTION,
    sectionIndex,
    photoIndex,
  };
}
export function deletePhotoFromGuide(photoIndex) {
  return {
    type: DELETE_PHOTO_FROM_GUIDE,
    photoIndex,
  };
}

export function deleteSection(sectionIndex) {
  return {
    type: DELETE_SECTION,
    sectionIndex,
  };
}

export function deleteGuide() {
  return {
    type: DELETE_GUIDE,
  };
}
