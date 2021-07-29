import { DeleteData, EditData } from "../actions/globalActions";
import {
  POST_CREATE,
  POST_LIST_BY_USER,
  POST_LIST_NEWS_FEED,
  POST_LOADING,
  POST_REMOVE,
  POST_UPDATE,
} from "../constants/postConstants";

// const postListNewsFeedReducer = (state = { posts: [] }, action) => {
//   switch (action.type) {
//     case POST_LIST_NEWS_FEED_REQUEST:
//       return { loading: true };
//     case POST_LIST_NEWS_FEED_SUCCESS:
//       return { loading: false, posts: action.payload };
//     case UPDATE_POST_LIST:
//       return {
//         loading: false,
//         ...state,
//         posts: [action.payload, ...state.posts],
//       };
//     case POST_LIST_NEWS_FEED_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const postListByUserReducer = (state = { posts: [] }, action) => {
//   switch (action.type) {
//     case POST_LIST_BY_USER_REQUEST:
//       return { loading: true };
//     case POST_LIST_BY_USER_SUCCESS:
//       return { loading: false, posts: action.payload };
//     case POST_LIST_BY_USER_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const postCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case POST_CREATE_REQUEST:
//       return { loading: true };
//     case POST_CREATE_SUCCESS:
//       return { loading: false, post: action.payload };
//     case POST_CREATE_FAIL:
//       return { loadign: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const postRemoveReducer = (state = {}, action) => {
//   switch (action.type) {
//     case POST_REMOVE_REQUEST:
//       return { loading: true };
//     case POST_REMOVE_SUCCESS:
//       return { loading: false, success: true };
//     case POST_REMOVE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const likePostReducer = (state = {}, action) => {
//   switch (action.type) {
//     case POST_LIKE_REQUEST:
//       return { loading: true };
//     case POST_LIKE_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         like: action.payload,
//       };
//     case POST_LIKE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const unlikePostReducer = (state = {}, action) => {
//   switch (action.type) {
//     case POST_UNLIKE_REQUEST:
//       return { loading: true };
//     case POST_UNLIKE_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         unlike: action.payload,
//       };
//     case POST_UNLIKE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const postCommentReducer = (state = { comments: [] }, action) => {
//   switch (action.type) {
//     case POST_COMMENT_REQUEST:
//       return { loading: true };
//     case POST_COMMENT_SUCCESS:
//       return { loading: false, comments: action.payload };
//     case POST_COMMENT_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const postUncommentReducer = (state = { uncomments: [] }, action) => {
//   switch (action.type) {
//     case POST_UNCOMMENT_REQUEST:
//       return { loading: true };
//     case POST_UNCOMMENT_SUCCESS:
//       return { loading: false, uncomments: action.payload };
//     case POST_UNCOMMENT_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export {
//   postListNewsFeedReducer,
//   postListByUserReducer,
//   postCreateReducer,
//   postRemoveReducer,
//   likePostReducer,
//   unlikePostReducer,
//   postCommentReducer,
//   postUncommentReducer,
// };

const initialState = {
  loading: false,
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LIST_NEWS_FEED:
      return {
        ...state,
        posts: action.payload,
      };
    case POST_LIST_BY_USER:
      return {
        ...state,
        posts: action.payload,
      };
    case POST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_CREATE:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POST_UPDATE:
      return {
        ...state,
        posts: EditData(
          state.posts,
          action.payload._id,
          action.payload,
        ),
      };
    case POST_REMOVE:
      return {
        ...state,
        posts: DeleteData(state.posts, action.payload),
      };
    default:
      return state;
  }
};

export default postReducer;
