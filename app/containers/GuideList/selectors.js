import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the guideList state domain
 */

const selectGuideListDomain = state => state.guideList || initialState;
const selectGuideListInner = state => state.guideList.guideList;
/**
 * Other specific selectors
 */

/**
 * Default selector used by GuideList
 */

const makeSelectGuideList = () =>
  createSelector(
    selectGuideListDomain,
    substate => substate,
  );

export default makeSelectGuideList;
export { selectGuideListDomain, selectGuideListInner };
