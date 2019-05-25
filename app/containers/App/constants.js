/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const AUTHENTICATE = 'FRESHMAN-SPA/APP/AUTHENTICATE';
export const LOGIN_USER = 'FRESHMAN-SPA/APP/LOGIN_USER';
export const LOGOUT_USER = 'FRESHMAN-SPA/APP/LOGOUT_USER';
export const SET_AUTH_STATUS = 'FRESHMAN-SPA/APP/SET_AUTH_STATUS';
export const SET_USER = 'FRESHMAN-SPA/APP/SET_USER';
export const SET_ERROR = 'FRESHMAN-SPA/APP/SET_ERROR';
