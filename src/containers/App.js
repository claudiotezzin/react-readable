import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import "styles/App.css";

import Header from "components/Header";
import PostsPage from "containers/PostsPage";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />

        <Switch>
          <Route exact path="/" component={PostsPage} />
          <Route exact path="/:categoryName" component={PostsPage} />
          <Route render={() => <div>ERROR</div>} />
        </Switch>

        {/* <Route
          exact
          path={"/:categoryName/:postId"}
          render={() => <div>TESTE</div>}
        /> */}
      </Fragment>
    );
  }
}

export default App;
