import axios from "axios";
import {
  CHAT_LOADING,
  CHAT_LIST_BY_USER,
  GET_CHAT_BY_ID,
  CREATE_CHAT,
} from "../constants/chatConstants";
import { GLOBAL_ALERT } from "../constants/globalConstants";

const getChatsByUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_LOADING, payload: true });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/chats", config);

    dispatch({ type: CHAT_LOADING, payload: false });

    dispatch({ type: CHAT_LIST_BY_USER, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GLOBAL_ALERT,
      payload: message,
    });
  }
};

const getChatById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_LOADING, payload: true });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chats/${id}`, config);

    dispatch({ type: CHAT_LOADING, payload: false });

    dispatch({ type: GET_CHAT_BY_ID, payload: data });
  } catch (error) {
    dispatch({
      type: GLOBAL_ALERT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const createChatAction = (users) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_LOADING, payload: true });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/chats`,
      { users },
      config,
    );

    dispatch({ type: CHAT_LOADING, payload: false });

    dispatch({ type: CREATE_CHAT, payload: data });
    window.location.href = `/chats`;
  } catch (error) {
    dispatch({
      type: GLOBAL_ALERT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { getChatsByUser, getChatById, createChatAction };
