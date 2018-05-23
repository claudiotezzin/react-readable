import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "styles/customDropdown.css";

// Components
import { fetchAllPosts, fetchAllCategories } from "../actions";
import CategoriesSelector from "components/CategoriesSelector";
import AddButton from "components/AddButton";
import Post from "components/Post";
import Dropdown from "react-dropdown";

const options = ["one", "two", "three"];
const defaultOption = options[0];

class PostPage extends Component {
  showCategories = false;

  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    this.showCategories = false;
  }

  onCategoryButtonClicked() {
    this.showCategories = true;
    this.forceUpdate();
  }

  render() {
    const { posts, match } = this.props;

    const selectedCategory =
      match.params.categoryName === undefined
        ? "all"
        : match.params.categoryName;

    if (posts === undefined || posts.length === 0) {
      return <div>LOADING...</div>;
    } else {
      return (
        <Fragment>
          <div className="row">
            <div className="posts-title col span-1-of-2">
              <h1>{selectedCategory} Posts</h1>
            </div>

            <div className="posts-categories col span-1-of-2">
              <a
                className="btn btn-categories"
                onClick={() => this.onCategoryButtonClicked()}
              >
                Categories
              </a>
            </div>
          </div>
          <div className="row">
            <div className="posts-search col span-6-of-8">SEARCH</div>
            <div className="posts-filter col span-2-of-8">
              <Dropdown
                className="posts-filter-dropdown"
                options={options}
                onChange={() => {}}
                value={defaultOption}
                placeholder="Select an option"
              />
            </div>
          </div>

          {posts
            .filter(
              post =>
                selectedCategory === "all" ||
                post.category.name === selectedCategory
            )
            .map(post => <Post key={post.id} postInfo={post} />)}

          <CategoriesSelector show={this.showCategories} />

          <AddButton />
        </Fragment>
      );
    }
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: Object.keys(categories).map(key => categories[key]),
    posts: Object.keys(posts).map(key => ({
      ...posts[key],
      category: categories[posts[key].category]
    }))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(fetchAllPosts()),
    getCategories: () => dispatch(fetchAllCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
