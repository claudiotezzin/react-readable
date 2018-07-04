export const isValidCategory = category => {
  if (
    category === "all" ||
    category === "redux" ||
    category === "react" ||
    category === "udacity"
  ) {
    return true;
  } else {
    return false;
  }
};
