import React from "react";
import { Link } from "react-router-dom";
import logo from "assets/images/readable.png";
import { selectCategory } from "../actions";
import { connect } from "react-redux";

const Header = ({ goHome }) => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Readable Logo" />
      </Link>
    </header>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    goHome: () => dispatch(selectCategory("all"))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Header);
