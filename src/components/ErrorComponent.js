import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({ message }) => {
  return (
    <div className="row error-container">
      <p className="error">404 ERROR</p>
      <p className="error-message">{message}</p>
    </div>
  );
};

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorComponent;
