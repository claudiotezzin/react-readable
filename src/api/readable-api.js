const api = "http://localhost:3001";

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

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

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

export const getPostsComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers }).then(res => res.json());
