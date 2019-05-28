/*
 *
 * ProfilePage actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_PROFILE,
  GET_PROFILE_GUIDES,
  GET_PROFILE_CODELABS,
  GET_PROFILE,
  SET_PROFILE_CODELABS,
  SET_PROFILE_GUIDES,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
  };
}
export function setProfilePageState(pageState) {
  return {
    type: SET_PROFILE,
    pageState,
  };
}
export function setProfileGuides(guides) {
  return {
    type: SET_PROFILE_GUIDES,
    guides,
  };
}
export function setProfileCodeLabs(codeLabs) {
  return {
    type: SET_PROFILE_CODELABS,
    codeLabs,
  };
}

export function getProfile() {
  return {
    type: GET_PROFILE,
  };
}
export function getProfileGuides() {
  return {
    type: GET_PROFILE_GUIDES,
  };
}

export function getProfileCodeLabs() {
  return {
    type: GET_PROFILE_CODELABS,
  };
}
