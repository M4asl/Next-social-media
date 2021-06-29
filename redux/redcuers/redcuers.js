import { combineReducers } from "redux";
import { itemReducer } from "./itemReducers";

const reducer = combineReducers({ itemReducer });

export default reducer;
