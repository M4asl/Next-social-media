import axios from "axios";
import {
  MESSAGE_LOADING,
  MESSAGES_BY_CHAT_ID,
  MESSAGE_CREATE,
} from "../constants/messageConstants";
import { GLOBAL_ALERT } from "../constants/globalConstants";

const getMessageByChatId = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MESSAGE_LOADING, payload: true });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/messages/${id}`, config);

    dispatch({ type: MESSAGE_LOADING, payload: false });

    dispatch({ type: MESSAGES_BY_CHAT_ID, payload: data });
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

const createMessage =
  (content, chatId) => async (dispatch, getState) => {
    try {
      dispatch({ type: MESSAGE_LOADING, payload: true });

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

      const { data } = await axios.post(
        `/api/messages`,
        { content, chatId },
        config,
      );

      dispatch({ type: MESSAGE_LOADING, payload: false });

      dispatch({ type: MESSAGE_CREATE, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      //   if (message === "Not authorized, token failed") {
      //     dispatch(logout());
      //   }
      dispatch({
        type: GLOBAL_ALERT,
        payload: message,
      });
    }
  };

export { getMessageByChatId, createMessage };
