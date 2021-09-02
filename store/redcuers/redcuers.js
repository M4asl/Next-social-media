import { combineReducers } from "redux";
import authReducer from "./authReducers";
import userReducer from "./userReducers";
import postReducer from "./postReducers";
import chatReducer from "./chatReducers";
import alert from "./alertReducers";

const reducer = combineReducers({
  alert,
  authReducer,
  userReducer,
  postReducer,
  chatReducer,
});

export default reducer;
