import React, { Component } from "react";
import { connect } from "react-redux";

import "styles/App.css";

import Header from "components/Header";
import PostsPage from "containers/PostsPage";
import { fetchAllCategories } from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div>
        <Header />
        <PostsPage />
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories: Object.keys(categories) };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: data => dispatch(fetchAllCategories(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
