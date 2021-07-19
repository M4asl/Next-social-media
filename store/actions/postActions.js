import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIST_BY_USER_FAIL,
  POST_LIST_BY_USER_REQUEST,
  POST_LIST_BY_USER_SUCCESS,
  POST_LIST_NEWS_FEED_FAIL,
  POST_LIST_NEWS_FEED_REQUEST,
  POST_LIST_NEWS_FEED_SUCCESS,
  POST_REMOVE_FAIL,
  POST_REMOVE_REQUEST,
  POST_REMOVE_SUCCESS,
  POST_UNCOMMENT_FAIL,
  POST_UNCOMMENT_REQUEST,
  POST_UNCOMMENT_SUCCESS,
  POST_UNLIKE_FAIL,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
  UPDATE_POST_LIST,
} from "../constants/postConstants";
import { logout } from "./authActions";

const listNewsFeed = (authCookie, req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    dispatch({ type: POST_LIST_NEWS_FEED_REQUEST });

    const config = {
      headers: {
        Cookie: authCookie,
      },
    };

    const { data } = await axios.get(
      `${origin}/api/posts/feed`,
      config,
    );

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
      getCurrentUserDetails: { currentUserDetails },
      authCookie,
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
    };

    const { data } = await axios.post(
      `/api/posts/new/${currentUserDetails._id}`,
      post,
      config,
    );

    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
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
      type: POST_CREATE_FAIL,
      payload: message,
    });
  }
};

const removePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_REMOVE_REQUEST });

    const { authCookie } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: authCookie,
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

const likePost = (postId, likeId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST });

    const { authCookie } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
    };

    const { data } = await axios.put(
      "/api/posts/like",
      { postId, likeId },
      config,
    );

    dispatch({ type: POST_LIKE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_LIKE_FAIL,
      payload: message,
    });
  }
};

const unlikePost =
  (postId, unlikeId) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_UNLIKE_REQUEST });

      const { authCookie } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
      };

      const { data } = await axios.put(
        "/api/posts/unlike",
        { postId, unlikeId },
        config,
      );

      dispatch({ type: POST_UNLIKE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: POST_UNLIKE_FAIL,
        payload: message,
      });
    }
  };

const comment =
  (userId, postId, text) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_COMMENT_REQUEST });

      const { authCookie } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
      };

      await axios.put(
        "/api/posts/comment",
        { userId, postId, comment: { text } },
        config,
      );

      dispatch({ type: POST_COMMENT_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: POST_COMMENT_FAIL,
        payload: message,
      });
    }
  };

const uncomment = (postId, _id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UNCOMMENT_REQUEST });

    const { authCookie } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
    };

    await axios.put(
      "/api/posts/uncomment",
      { postId, comment: { _id } },
      config,
    );

    dispatch({ type: POST_UNCOMMENT_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_UNCOMMENT_FAIL,
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
  likePost,
  unlikePost,
  comment,
  uncomment,
};
