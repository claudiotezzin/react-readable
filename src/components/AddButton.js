import React from "react";
import PropTypes from "prop-types";

const AddButton = ({ categoryColor, handleAddButtonClicked }) => {
  return (
    <i
      className="icon ion-ios-add add-post-button"
      style={{ backgroundColor: categoryColor }}
      onClick={() => {
        handleAddButtonClicked();
      }}
    />
  );
};

AddButton.propTypes = {
  categoryColor: PropTypes.string.isRequired,
  handleAddButtonClicked: PropTypes.func.isRequired
};

export default AddButton;
