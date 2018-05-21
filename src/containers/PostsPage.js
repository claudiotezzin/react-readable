import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "styles/customDropdown.css";

// Components
import { fetchAllCategories, fetchAllPosts } from "../actions";
import CategoriesSelector from "components/CategoriesSelector";
import Post from "components/Post";
import Dropdown from "react-dropdown";

const options = ["one", "two", "three"];
const defaultOption = options[0];

class PostListPage extends Component {
  state = {
    showCategory: false,
    selectedCategory: "all"
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  onCategorySelected = category => {
    this.setState({
      showCategory: false,
      selectedCategory: category.name
    });
  };

  onCategoryButtonClicked() {
    this.setState({ showCategory: true });
  }

  render() {
    const { selectedCategory } = this.state;
    const { posts, categories } = this.props;

    return (
      <Fragment>
        <div className="row">
          <div className="posts-title col span-1-of-2">
            <h1>{selectedCategory} Posts</h1>
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
              selectedCategory === "all" ||
              post.category.name === selectedCategory
          )
          .map(post => <Post key={post.id} postInfo={post} />)}

        <CategoriesSelector
          show={this.state.showCategory}
          categories={categories}
          onCategorySelected={this.onCategorySelected}
        />
      </Fragment>
    );
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
    getCategories: data => dispatch(fetchAllCategories(data)),
    getPosts: data => dispatch(fetchAllPosts(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
