import axios from "axios";
import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_LIST_BY_USER_FAIL,
  POST_LIST_BY_USER_REQUEST,
  POST_LIST_BY_USER_SUCCESS,
  POST_LIST_NEWS_FEED_FAIL,
  POST_LIST_NEWS_FEED_REQUEST,
  POST_LIST_NEWS_FEED_SUCCESS,
  POST_REMOVE_FAIL,
  POST_REMOVE_REQUEST,
  POST_REMOVE_SUCCESS,
  UPDATE_POST_LIST,
} from "../constants/postConstants";
import { logout } from "./authActions";

const listNewsFeed =
  (pageNumber, authCookie) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_LIST_NEWS_FEED_REQUEST });

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authCookie,
        },
      };

      const { data } = await axios.get(
        `/api/posts/feed/?pageNumber=${pageNumber}`,
        config,
      );
      if (pageNumber > 2) {
        dispatch({ type: UPDATE_POST_LIST, payload: data });
      } else
        dispatch({
          type: POST_LIST_NEWS_FEED_SUCCESS,
          payload: data,
        });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: POST_LIST_NEWS_FEED_FAIL,
        payload: message,
      });
    }
  };

const updateListNewsFeed =
  (pageNumber) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_LIST_NEWS_FEED_REQUEST });

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

      const { data } = await axios.get(
        `/api/posts/feed/${userInfo._id}?pageNumber=${pageNumber}`,
        config,
      );

      dispatch({ type: UPDATE_POST_LIST, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: POST_LIST_NEWS_FEED_FAIL,
        payload: message,
      });
    }
  };

const listByUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_BY_USER_REQUEST });

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

    const { data } = await axios.get(`/api/posts/by/${id}`, config);

    dispatch({ type: POST_LIST_BY_USER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_LIST_BY_USER_FAIL,
      payload: message,
    });
  }
};

const createPost = (post) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

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
      `/api/posts/new/${userInfo._id}`,
      post,
      config,
    );

    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_CREATE_FAIL,
      payload: message,
    });
  }
};

const removePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_REMOVE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/posts/${id}`, config);

    dispatch({ type: POST_REMOVE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_REMOVE_FAIL,
      payload: message,
    });
  }
};

export {
  listNewsFeed,
  listByUser,
  createPost,
  removePost,
  updateListNewsFeed,
};
