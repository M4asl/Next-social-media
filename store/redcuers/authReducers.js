import {
  CURRENT_USER_PROFILE_DETAILS,
  USER_LOGIN_DETAILS,
  USER_LOGOUT,
  USER_REGISTER_DETAILS,
  AUTHENTICATE,
  DEAUTHENTICATE,
  USER_LOADING_ACTION,
} from "../constants/authConstants";

const initialState = {
  userInfo: {},
  currentUserDetails: {},
  loading: false,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING_ACTION:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_LOGIN_DETAILS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_REGISTER_DETAILS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case CURRENT_USER_PROFILE_DETAILS:
      return {
        ...state,
        currentUserDetails: action.payload,
      };
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload,
      };
    case DEAUTHENTICATE:
      return {
        ...state,
        token: null,
      };
    case USER_LOGOUT:
      return {
        userInfo: {},
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
