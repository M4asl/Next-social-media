import { ITEM_REDUCER } from "../constants/itemConstants";

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_REDUCER:
      return {};
    default:
      return state;
  }
};

export { itemReducer };
