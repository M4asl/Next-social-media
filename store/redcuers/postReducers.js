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

const postListNewsFeedReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_NEWS_FEED_REQUEST:
      return { loading: true };
    case POST_LIST_NEWS_FEED_SUCCESS:
      return { loading: false, posts: action.payload };
    case UPDATE_POST_LIST:
      return {
        loading: false,
        ...state,
        posts: [action.payload, ...state.posts],
      };
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

const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return {
        loading: false,
        success: true,
        like: action.payload,
      };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const unlikePostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UNLIKE_REQUEST:
      return { loading: true };
    case POST_UNLIKE_SUCCESS:
      return {
        loading: false,
        success: true,
        unlike: action.payload,
      };
    case POST_UNLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const postCommentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return { loading: true };
    case POST_COMMENT_SUCCESS:
      return { loading: false, comments: action.payload };
    case POST_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const postUncommentReducer = (state = { uncomments: [] }, action) => {
  switch (action.type) {
    case POST_UNCOMMENT_REQUEST:
      return { loading: true };
    case POST_UNCOMMENT_SUCCESS:
      return { loading: false, uncomments: action.payload };
    case POST_UNCOMMENT_FAIL:
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
  likePostReducer,
  unlikePostReducer,
  postCommentReducer,
  postUncommentReducer,
};
