import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "styles/customDropdown.css";

// Components
import { fetchAllPosts } from "../actions";
import CategoriesSelector from "components/CategoriesSelector";
import AddButton from "components/AddButton";
import Post from "components/Post";
import Dropdown from "react-dropdown";

const options = ["one", "two", "three"];
const defaultOption = options[0];

class PostPage extends Component {
  showCategories = false;

  componentDidMount() {
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
    const { posts, selectedCategory } = this.props;

    return (
      <Fragment>
        {selectedCategory === undefined ? (
          <div>LOADING...</div>
        ) : (
          <Fragment>
            <div className="row">
              <div className="posts-title col span-1-of-2">
                <h1>{selectedCategory.name} Posts</h1>
              </div>

              <div className="posts-categories col span-1-of-2">
                <a
                  className="btn btn-categories"
                  href="#categories"
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
                  selectedCategory.name === "all" ||
                  post.category.name === selectedCategory.name
              )
              .map(post => <Post key={post.id} postInfo={post} />)}

            <CategoriesSelector show={this.showCategories} />

            <AddButton />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    posts: Object.keys(posts).map(key => ({
      ...posts[key],
      category: categories[posts[key].category]
    }))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(fetchAllPosts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
