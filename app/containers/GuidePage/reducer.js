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
  ADD_SECTION_TO_EDIT,
} from './constants';

export const initialState = {
  guide: {
    sections: [
      {
        id: '',
        details: '',
        title: '',
      },
    ],
  },
  editGuide: {
    sections: [
      {
        id: '',
        details: '',
        title: '',
      },
    ],
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
        draft.guide.sections[action.index].details = action.details;
        break;
      case SET_SECTION_TITLE:
        draft.guide.sections[action.index].title = action.title;
        break;
      case ADD_SECTION_TO_EDIT:
        console.log('acinitng', action.section);
        draft.editGuide.sections = [
          ...draft.editGuide.sections,
          action.section,
        ];
    }
  });

export default guidePageReducer;
