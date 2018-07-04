import React from "react";
import PropTypes from "prop-types";

const EmptyState = ({ message }) => {
  return (
    <div className="row empty-state-container">
      <p className="empty-state-message">{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired
};

export default EmptyState;
