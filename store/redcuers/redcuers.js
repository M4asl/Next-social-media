import { combineReducers } from "redux";
import userReducer from "./authReducers";
import postReducer from "./postReducers";
import alert from "./alertReducer";

const reducer = combineReducers({
  alert,
  userReducer,
  postReducer,
});

export default reducer;
