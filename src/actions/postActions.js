import * as ReadableAPI from "api/readable-api";

export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST_BY_ID = "FETCH_POST_BY_ID";
export const FETCH_POST_COMMENTS = "FETCH_POST_COMMENTS";

export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const VOTE_POST_UP = "VOTE_POST_UP";
export const VOTE_POST_DOWN = "VOTE_POST_DOWN";

export const fetchAllPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(posts => dispatch(getPosts(posts)));

export const getPosts = posts => ({
  type: FETCH_POSTS,
  posts
});

export const fetchPost = id => dispatch =>
  ReadableAPI.getPost(id).then(post => dispatch(getPost(post)));

export const getPost = post => ({
  type: FETCH_POST_BY_ID,
  post
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

export const fetchPostComments = postId => dispatch =>
  ReadableAPI.getPostsComments(postId).then(comments =>
    dispatch(getPostComments(comments))
  );

export const getPostComments = comments => ({
  type: FETCH_POST_COMMENTS,
  comments
});

export const addPost = (title, body, author, category) => dispatch =>
  ReadableAPI.addPost(title, body, author, category).then(post =>
    dispatch(postAdded(post))
  );

export const postAdded = post => ({
  type: ADD_POST,
  post
});

export const updatePost = (postId, title, body, author, category) => dispatch =>
  ReadableAPI.updatePost(postId, title, body, author, category).then(post =>
    dispatch(postUpdated(post))
  );

export const postUpdated = post => ({
  type: UPDATE_POST,
  post
});

export const deletePost = postId => dispatch =>
  ReadableAPI.removePost(postId).then(post => dispatch(postDeleted(post)));

export const postDeleted = post => ({
  type: REMOVE_POST,
  post
});
