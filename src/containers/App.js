import React, { Component } from "react";
import "normalize.css";
import "styles/vendors/css/Grid.css";
import "styles/App.css";
import Header from "components/Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;
