import * as ReadableAPI from "api/readable-api";

// ACTIONS
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_POSTS = "FETCH_POSTS";

export const SELECT_CATEGORY = "SELECT_CATEGORY";

export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const VOTE_POST_UP = "VOTE_POST_UP";
export const VOTE_POST_DOWN = "VOTE_POST_DOWN";

export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const VOTE_COMMENT_UP = "VOTE_COMMENT_UP";
export const VOTE_COMMENT_DOWN = "VOTE_COMMENT_DOWN";

export const fetchAllCategories = () => dispatch =>
  ReadableAPI.getAllCategories().then(categories =>
    dispatch(getCategories(categories))
  );

export const getCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories
});

export const fetchAllPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(posts => dispatch(getPosts(posts)));

export const getPosts = posts => ({
  type: FETCH_POSTS,
  posts
});

export const votePostUp = postId => dispatch =>
  ReadableAPI.votePostUp(postId).then(post => dispatch(votedPostUp(post)));

export const votedPostUp = post => ({
  type: VOTE_POST_UP,
  post
});

export const votePostDown = postId => dispatch =>
  ReadableAPI.votePostDown(postId).then(post => dispatch(votedPostDown(post)));

export const votedPostDown = post => ({
  type: VOTE_POST_DOWN,
  post
});

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
});
