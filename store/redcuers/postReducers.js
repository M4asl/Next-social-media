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

const postListNewsFeedReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_NEWS_FEED_REQUEST:
      return { loading: true };
    case POST_LIST_NEWS_FEED_SUCCESS:
      return { posts: action.payload };
    case UPDATE_POST_LIST:
      return { posts: state.posts.concat(action.payload) };
    case POST_LIST_NEWS_FEED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const postListByUserReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_BY_USER_REQUEST:
      return { loading: true };
    case POST_LIST_BY_USER_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_BY_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_CREATE_FAIL:
      return { loadign: false, error: action.payload };
    default:
      return state;
  }
};

const postRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_REMOVE_REQUEST:
      return { loading: true };
    case POST_REMOVE_SUCCESS:
      return { loading: false, success: true };
    case POST_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  postListNewsFeedReducer,
  postListByUserReducer,
  postCreateReducer,
  postRemoveReducer,
};
