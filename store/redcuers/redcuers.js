import { combineReducers } from "redux";
import {
  userLoginReducer,
  userRegisterReducer,
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
  postListNewsFeed: postListNewsFeedReducer,
  postListByUser: postListByUserReducer,
  postCreate: postCreateReducer,
  postRemove: postRemoveReducer,
});

export default reducer;
