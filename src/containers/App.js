import React, { Component } from "react";
import "styles/App.css";
import Header from "components/Header";
import PostsPage from "containers/PostsPage";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <PostsPage />
      </div>
    );
  }
}

export default App;
