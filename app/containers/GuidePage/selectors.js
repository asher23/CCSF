import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the guidePage state domain
 */

const selectGuidePageDomain = state => state.guidePage || initialState;
const selectGuideId = state => state.guidePage.guide.id;
const selectEditGuide = state => state.guidePage.editGuide;
const selectCreatorId = state => {
  if (state.guidePage) {
    return state.guidePage.guide.creatorId;
  }
  return null;
};
// const selectCreatorId = state => state.guidePage.guide.creatorId;
const selectUserId = state => state.app.user.id;
/**
 * Other specific selectors
 */

/**
 * Default selector used by GuidePage
 */

const makeSelectGuidePage = () =>
  createSelector(
    selectGuidePageDomain,
    substate => substate,
  );

const makeSelectIsCreator = () =>
  createSelector(
    selectCreatorId,
    selectUserId,
    (creatorId, userId) => creatorId === userId,
  );

export default makeSelectGuidePage;
export {
  selectGuidePageDomain,
  selectGuideId,
  makeSelectIsCreator,
  selectEditGuide,
};
