import {
  FETCH_POSTS,
  VOTE_POST_UP,
  VOTE_POST_DOWN,
  FETCH_POST_BY_ID,
  ADD_POST,
  UPDATE_POST,
  REMOVE_POST
} from "../actions";

function posts(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS: {
      const { posts } = action;

      let result = {};
      for (var postId in posts) {
        result[posts[postId].id] = {
          ...posts[postId]
        };
      }
      return result;
    }
    case VOTE_POST_UP:
    case VOTE_POST_DOWN:
    case ADD_POST:
    case UPDATE_POST:
    case REMOVE_POST: {
      const { post } = action;

      return {
        ...state,
        [post.id]: post
      };
    }
    case FETCH_POST_BY_ID: {
      const { post } = action;

      if (post === undefined || Object.keys(post).length === 0) {
        return state;
      } else {
        return {
          ...state,
          [post.id]: post
        };
      }
    }
    default:
      return state;
  }
}

export default posts;
