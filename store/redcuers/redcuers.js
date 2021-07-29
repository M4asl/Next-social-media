import { combineReducers } from "redux";
import {
  getCurrentUserDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  authCookieReducer,
} from "./authReducers";
import postReducer from "./postReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getCurrentUserDetails: getCurrentUserDetailsReducer,
  authCookie: authCookieReducer,
  postReducer,
});

export default reducer;
