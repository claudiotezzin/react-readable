import React, { Component, Fragment } from "react";
import CategoriesSelector from "components/CategoriesSelector";
import Post from "components/Post";
import Dropdown from "react-dropdown";
import "styles/customDropdown.css";

const options = ["one", "two", "three"];
const defaultOption = options[0];

class PostListPage extends Component {
  state = {
    showCategory: false
  };

  onCategorySelected = category => {
    this.setState({ showCategory: false });
  };

  onCategoryButtonClicked() {
    this.setState({ showCategory: true });
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="posts-title col span-1-of-2">
            <h1>All Posts</h1>
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

        <Post />
        {this.state.showCategory && (
          <CategoriesSelector onCategorySelected={this.onCategorySelected} />
        )}

        <Post />
        {this.state.showCategory && (
          <CategoriesSelector onCategorySelected={this.onCategorySelected} />
        )}

        <Post />
        {this.state.showCategory && (
          <CategoriesSelector onCategorySelected={this.onCategorySelected} />
        )}
      </Fragment>
    );
  }
}

export default PostListPage;
