import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import "styles/App.css";

import Header from "components/Header";
import PostsPage from "containers/PostsPage";
import PostDetail from "containers/PostDetail";
import ErrorComponent from "../components/ErrorComponent";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />

        <Switch>
          <Route exact path="/" component={PostsPage} />
          <Route exact path="/:categoryName" component={PostsPage} />
          <Route exact path="/:categoryName/:postId" component={PostDetail} />
          <Route component={ErrorComponent} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
