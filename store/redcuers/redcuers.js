import { combineReducers } from "redux";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./authReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default reducer;
