import {
  CURRENT_USER_PROFILE_DETAILS_FAIL,
  CURRENT_USER_PROFILE_DETAILS_REQUEST,
  CURRENT_USER_PROFILE_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  AUTHENTICATE,
  DEAUTHENTICATE,
} from "../constants/authConstants";

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const authCookieReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, token: action.payload };
    case DEAUTHENTICATE:
      return { token: null };
    default:
      return state;
  }
};

const getCurrentUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_USER_PROFILE_DETAILS_REQUEST:
      return { loading: true };
    case CURRENT_USER_PROFILE_DETAILS_SUCCESS:
      return { loading: false, currentUserDetails: action.payload };
    case CURRENT_USER_PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  userRegisterReducer,
  userLoginReducer,
  getCurrentUserDetailsReducer,
  authCookieReducer,
};
