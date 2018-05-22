import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchAllCategories } from "../actions";

import "styles/App.css";

import Header from "components/Header";
import PostsPage from "containers/PostsPage";

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <Fragment>
        <Header />
        <Route
          exact
          path="/"
          render={() => <PostsPage selectedCategory={categories.all} />}
        />
        <Route
          exact
          path="/react"
          render={() => <PostsPage selectedCategory={categories.react} />}
        />
        <Route
          exact
          path="/redux"
          render={() => <PostsPage selectedCategory={categories.redux} />}
        />
        <Route
          exact
          path="/udacity"
          render={() => <PostsPage selectedCategory={categories.udacity} />}
        />
      </Fragment>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchAllCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
