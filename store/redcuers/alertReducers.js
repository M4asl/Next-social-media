import { GLOBAL_ALERT } from "../constants/globalConstants";

const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
