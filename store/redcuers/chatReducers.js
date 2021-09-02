import {
  CHAT_LOADING,
  CHAT_LIST_BY_USER,
  GET_CHAT_BY_ID,
  CREATE_CHAT,
} from "../constants/chatConstants";

const initialState = {
  loading: false,
  chats: [],
  chat: {},
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CHAT_LIST_BY_USER:
      return {
        ...state,
        chats: action.payload,
      };
    case GET_CHAT_BY_ID:
      return {
        ...state,
        chat: action.payload,
      };
    case CREATE_CHAT:
      return {
        ...state,
        chats: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
};

export default chatReducer;
