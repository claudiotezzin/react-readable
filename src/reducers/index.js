import { combineReducers } from "redux";
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  VOTE_POST_UP,
  VOTE_POST_DOWN
} from "../actions/index";

import UdacityLogo from "assets/images/udacity.png";
import ReactLogo from "assets/images/react.png";
import ReduxLogo from "assets/images/redux.png";
import AllLogo from "assets/images/all.png";

const categoriesDefault = {
  all: {
    name: "all",
    logo: AllLogo,
    color: "#8F2D56"
  }
};

function categories(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      const { categories } = action;

      let result = { ...categoriesDefault };

      for (var category in categories) {
        const catName = categories[category].name;
        result[catName] = {
          name: catName,
          logo:
            catName === "redux"
              ? ReduxLogo
              : catName === "react"
                ? ReactLogo
                : UdacityLogo,
          color:
            catName === "redux"
              ? "#FFBC42"
              : catName === "react"
                ? "#218380"
                : "#D81159"
        };
      }

      return result;

    default:
      return state;
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const { posts } = action;

      let result = {};
      for (var postId in posts) {
        result[posts[postId].id] = {
          ...posts[postId]
        };
      }
      return result;
    case VOTE_POST_UP:
    case VOTE_POST_DOWN:
      const { post } = action;

      return {
        ...state,
        [post.id]: post
      };
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts
});
