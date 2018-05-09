import React, { Component } from "react";
import logo from "assets/images/readable.png";
import "normalize.css";
import "styles/vendors/css/Grid.css";
import "styles/App.css";

class App extends Component {
  render() {
    return (
      <header>
        <img className="app-logo" src={logo} alt="Readable Logo" />
      </header>
    );
  }
}

export default App;
