const api = "http://localhost:3001";
const uuidv4 = require("uuid/v4");

// Generate a unique token for storing your data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

/****************************************************
// CATEGORIES
****************************************************/
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

/****************************************************
// POSTS
****************************************************/
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const getPost = id =>
  fetch(`${api}/posts/${id}`, { headers }).then(res => res.json());

export const votePostUp = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: "upVote" })
  }).then(res => res.json());

export const votePostDown = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: "downVote" })
  }).then(res => res.json());

export const getPostsComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers }).then(res => res.json());

export const addPost = (title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      body,
      author,
      category: category.toLowerCase(),
      timestamp: Date.now(),
      id: uuidv4()
    })
  }).then(res => res.json());

export const updatePost = (postId, title, body, author, category) =>
  fetch(`${api}/posts/${postId}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      body,
      author,
      category: category.toLowerCase(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const removePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());

/****************************************************
// COMMENTS
****************************************************/
export const voteCommentUp = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: "upVote" })
  }).then(res => res.json());

export const voteCommentDown = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: "downVote" })
  }).then(res => res.json());

export const addComment = (postId, body, author) =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      body,
      author,
      parentId: postId,
      timestamp: Date.now(),
      id: uuidv4()
    })
  }).then(res => res.json());

export const updateComment = (commentId, body, author) =>
  fetch(`${api}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      body,
      author,
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const removeComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
