import * as ReadableAPI from "api/readable-api";

// ACTIONS
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_POST = "FETCH_POST";

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

// export function addRecipe({ title, body, author, category }) {
//   return {
//     type: ADD_POST,
//     recipe,
//     day,
//     meal
//   };
// }

// export function removeRecipeFromCalendar({ day, meal }) {
//   return {
//     type: REMOVE_FROM_CALENDAR,
//     day,
//     meal
//   };
// }
