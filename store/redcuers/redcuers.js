import { combineReducers } from "redux";
import {
  getCurrentUserDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  authCookieReducer,
} from "./authReducers";
import {
  postListNewsFeedReducer,
  postListByUserReducer,
  postCreateReducer,
  postRemoveReducer,
} from "./postReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getCurrentUserDetails: getCurrentUserDetailsReducer,
  postListNewsFeed: postListNewsFeedReducer,
  postListByUser: postListByUserReducer,
  postCreate: postCreateReducer,
  postRemove: postRemoveReducer,
  authCookie: authCookieReducer,
});

export default reducer;
