import {
  FETCH_POST_COMMENTS,
  VOTE_COMMENT_DOWN,
  VOTE_COMMENT_UP,
  ADD_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT
} from "../actions/index";

function comments(state = {}, action) {
  switch (action.type) {
    case FETCH_POST_COMMENTS: {
      const { comments } = action;

      let result = {};
      for (var index in comments) {
        const comment = comments[index];
        result[comment.id] = {
          ...comment
        };
      }
      return result;
    }
    case VOTE_COMMENT_DOWN:
    case VOTE_COMMENT_UP: {
      const { comment } = action;

      return {
        ...state,
        [comment.id]: comment
      };
    }
    case ADD_COMMENT: {
      const { comment } = action;

      return {
        ...state,
        [comment.id]: comment
      };
    }
    case UPDATE_COMMENT: {
      const { comment } = action;

      return {
        ...state,
        [comment.id]: comment
      };
    }
    case REMOVE_COMMENT: {
      const { comment } = action;

      let result = { ...state };
      delete result[comment.id];

      return result;
    }
    default:
      return state;
  }
}

export default comments;
