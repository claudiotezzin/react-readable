import { combineReducers } from "redux";
import {
  FETCH_CATEGORIES,
  FETCH_POSTS,
  VOTE_POST_UP,
  VOTE_POST_DOWN,
  SELECT_CATEGORY,
  FETCH_POST_BY_ID,
  FETCH_POST_COMMENTS,
  VOTE_COMMENT_DOWN,
  VOTE_COMMENT_UP
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
    case VOTE_POST_DOWN: {
      const { post } = action;

      return {
        ...state,
        [post.id]: post
      };
    }
    case FETCH_POST_BY_ID: {
      const { post } = action;

      return {
        ...state,
        [post.id]: post
      };
    }
    default:
      return state;
  }
}

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
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments
});
