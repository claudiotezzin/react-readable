import { combineReducers } from "redux";
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  VOTE_POST_UP,
  VOTE_POST_DOWN,
  SELECT_CATEGORY
} from "../actions/index";

import UdacityLogo from "assets/images/udacity.png";
import ReactLogo from "assets/images/react.png";
import ReduxLogo from "assets/images/redux.png";
import AllLogo from "assets/images/all.png";

const categoriesDefault = {
  all: {
    name: "all",
    logo: AllLogo,
    color: "#8F2D56",
    isSelected: true
  }
};

function categories(state = {}, action) {
  let result = {};
  switch (action.type) {
    case FETCH_CATEGORIES:
      const { categories } = action;

      result = { ...categoriesDefault };

      for (const category in categories) {
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
                : "#D81159",
          isSelected: false
        };
      }

      return result;

    case SELECT_CATEGORY:
      const { categoryName } = action;

      result = { ...state };

      for (const cat in result) {
        const catName = result[cat].name;
        if (catName === categoryName) {
          result[catName].isSelected = true;
        } else {
          result[catName].isSelected = false;
        }
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
