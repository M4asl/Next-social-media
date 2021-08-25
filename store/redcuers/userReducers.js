import {
  USER_LIST,
  USER_EDIT_PROFILE,
  USER_DELETE,
  USER_FIND_PEOPLE,
  USER_FOLLOW,
  USER_UNFOLLOW,
  USER_LOADING,
  USER_DETAILS,
  CURRENT_USER_PROFILE_DETAILS,
} from "../constants/userConstants";

const initialState = {
  loading: false,
  users: [],
  usersToFollow: [],
  user: { followers: [] },
  currentUserDetails: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CURRENT_USER_PROFILE_DETAILS:
      return {
        ...state,
        currentUserDetails: action.payload,
      };
    case USER_LIST:
      return {
        ...state,
        users: action.payload,
      };
    case USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_FIND_PEOPLE:
      return {
        ...state,
        usersToFollow: action.payload,
      };
    case USER_EDIT_PROFILE:
      return {
        ...state,
        currentUserDetails: action.payload,
      };
    case USER_DELETE:
      return {
        ...state,
        userInfo: {},
      };
    case USER_FOLLOW:
      return {
        ...state,
        user: { ...state.user, followers: action.payload },
      };
    case USER_UNFOLLOW:
      return {
        ...state,
        user: { ...state.user, followers: action.payload },
      };
    default:
      return state;
  }
};

export default userReducer;
