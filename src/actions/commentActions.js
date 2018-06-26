import * as ReadableAPI from "api/readable-api";

export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const VOTE_COMMENT_UP = "VOTE_COMMENT_UP";
export const VOTE_COMMENT_DOWN = "VOTE_COMMENT_DOWN";

export const voteCommentUp = commentId => dispatch =>
  ReadableAPI.voteCommentUp(commentId).then(comment =>
    dispatch(votedCommentUp(comment))
  );

export const votedCommentUp = comment => ({
  type: VOTE_COMMENT_UP,
  comment
});

export const voteCommentDown = commentId => dispatch =>
  ReadableAPI.voteCommentDown(commentId).then(comment =>
    dispatch(votedCommentDown(comment))
  );

export const votedCommentDown = comment => ({
  type: VOTE_COMMENT_DOWN,
  comment
});

export const addComment = (postId, body, author) => dispatch =>
  ReadableAPI.addComment(postId, body, author).then(comment =>
    dispatch(commentAdded(comment))
  );

export const commentAdded = comment => ({
  type: ADD_COMMENT,
  comment
});

export const updateComment = (commentId, body, author) => dispatch =>
  ReadableAPI.updateComment(commentId, body, author).then(comment =>
    dispatch(commentUpdated(comment))
  );

export const commentUpdated = comment => ({
  type: UPDATE_COMMENT,
  comment
});

export const deleteComment = commentId => dispatch =>
  ReadableAPI.removeComment(commentId).then(comment =>
    dispatch(commentDeleted(comment))
  );

export const commentDeleted = comment => ({
  type: REMOVE_COMMENT,
  comment
});
