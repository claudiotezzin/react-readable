import { combineReducers } from "redux";
import categories from "./categoriesReducers";
import posts from "./postsReducers";
import comments from "./commentsReducers";

export default combineReducers({
  categories,
  posts,
  comments
});
