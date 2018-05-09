import React from "react";
import logo from "assets/images/readable.png";

const Header = () => {
  return (
    <header>
      <img className="app-logo" src={logo} alt="Readable Logo" />
    </header>
  );
};

export default Header;
