import * as ReadableAPI from "api/readable-api";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const SELECT_CATEGORY = "SELECT_CATEGORY";

export const fetchAllCategories = () => dispatch =>
  ReadableAPI.getAllCategories().then(categories =>
    dispatch(getCategories(categories))
  );

export const getCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories
});

export const selectCategory = categoryName => ({
  type: SELECT_CATEGORY,
  categoryName
});
