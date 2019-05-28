/*
 *
 * GuidePage reducer
 *
 */
import produce from 'immer';
import {
  SET_GUIDE,
  SET_SECTION_DETAILS,
  SET_SECTION_TITLE,
  SET_EDIT_GUIDE,
  SET_EDIT_GUIDE_TITLE,
  SET_EDIT_GUIDE_DESCRIPTION,
  ADD_SECTION_TO_EDIT,
  SET_EDIT_GUIDE_PHOTOS,
  SET_SECTION_PHOTOS,
  DELETE_PHOTO_FROM_SECTION,
  DELETE_PHOTO_FROM_GUIDE,
  DELETE_SECTION,
} from './constants';

export const initialState = {
  guide: {
    sections: [
      {
        id: '',
        description: '',
        title: '',
        photos: [],
      },
    ],
    photos: [],
  },
  editGuide: {
    sections: [
      {
        id: '',
        description: '',
        title: '',
        photos: [],
      },
    ],
    photos: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const guidePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_GUIDE:
        draft.guide = action.guide;
        break;
      case SET_EDIT_GUIDE:
        draft.editGuide = action.editGuide;
        break;
      case SET_SECTION_DETAILS:
        draft.editGuide.sections[action.index].details = action.details;
        break;
      case SET_SECTION_TITLE:
        draft.editGuide.sections[action.index].title = action.title;
        break;
      case SET_SECTION_PHOTOS:
        draft.editGuide.sections[action.index].photos = action.photos;
        break;
      case ADD_SECTION_TO_EDIT:
        draft.editGuide.sections = [
          ...draft.editGuide.sections,
          action.section,
        ];
        break;
      case SET_EDIT_GUIDE_TITLE:
        draft.editGuide.title = action.title;
        break;
      case SET_EDIT_GUIDE_DESCRIPTION:
        draft.editGuide.description = action.description;
        break;
      case SET_EDIT_GUIDE_PHOTOS:
        draft.editGuide.photos = action.photos;
        break;
      case DELETE_PHOTO_FROM_SECTION:
        draft.editGuide.sections[
          action.sectionIndex
        ].photos = draft.editGuide.sections[action.sectionIndex].photos.filter(
          (photo, idx) => action.photoIndex !== idx,
        );
        break;
      case DELETE_PHOTO_FROM_GUIDE:
        draft.editGuide.photos = draft.editGuide.photos.filter(
          (photo, idx) => action.photoIndex !== idx,
        );
        break;
      case DELETE_SECTION:
        draft.editGuide.sections = draft.editGuide.sections.filter(
          (section, idx) => action.sectionIndex !== idx,
        );
        break;
    }
  });

export default guidePageReducer;
