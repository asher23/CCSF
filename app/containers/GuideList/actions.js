/*
 *
 * GuideList actions
 *
 */

import { DEFAULT_ACTION, SET_GUIDES, GET_GUIDES } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setGuides(guides) {
  return {
    type: SET_GUIDES,
    guides,
  };
}

export function getGuides() {
  return {
    type: GET_GUIDES,
  };
}
