import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "styles/customDropdown.css";

// Components
import { fetchAllPosts, fetchAllCategories } from "../actions";
import CategoriesSelector from "components/CategoriesSelector";
import AddButton from "components/AddButton";
import Post from "components/Post";
import Dropdown from "react-dropdown";
import CreatePost from "components/CreatePost";
import { isValidCategory } from "../utils/helpers";
import ErrorComponent from "../components/ErrorComponent";
import ReactLoading from "react-loading";
import EmptyState from "../components/EmptyState";

const options = ["Date", "Votes"];

class PostPage extends Component {
  state = {
    isModalOpen: false,
    sortePostBy: options[0],
    isLoading: true
  };

  postToEdit = undefined;
  showCategories = false;

  componentDidMount() {
    Promise.all([this.props.getCategories(), this.props.getPosts()]).then(
      () => {
        console.log("I did everything!");
        this.setState({ isLoading: false });
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    this.showCategories = false;
  }

  onCategoryButtonClicked() {
    this.showCategories = true;
    this.forceUpdate();
  }

  handleCloseModal = () => {
    this.postToEdit = undefined;
    this.setState({
      isModalOpen: false
    });
  };

  handleAddButtonClicked = () => {
    this.setState({
      isModalOpen: true
    });
  };

  handleEditPostButtonClicked = post => {
    this.postToEdit = post;
    this.setState({
      isModalOpen: true
    });
  };

  compareByDate = (a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    }

    if (a.timestamp > b.timestamp) {
      return -1;
    }

    return 0;
  };

  compareByVotes = (a, b) => {
    if (a.voteScore < b.voteScore) {
      return 1;
    }

    if (a.voteScore > b.voteScore) {
      return -1;
    }

    return 0;
  };

  render() {
    const { posts, match, categories } = this.props;

    posts.sort((a, b) => {
      if (this.state.sortePostBy === "Date") {
        return this.compareByDate(a, b);
      } else {
        return this.compareByVotes(a, b);
      }
    });

    const selectedCategory =
      match.params.categoryName === undefined
        ? "all"
        : match.params.categoryName;

    const availablePosts = posts
      .filter(p => p.deleted !== true)
      .filter(
        p => selectedCategory === "all" || p.category.name === selectedCategory
      );

    if (isValidCategory(selectedCategory) === false) {
      return (
        <ErrorComponent
          message={`This category "${selectedCategory}" is not valid!`}
        />
      );
    } else if (this.state.isLoading === true) {
      return (
        <div className="row">
          <ReactLoading
            type="spinningBubbles"
            color="#D81159"
            className="spinner"
            height={367}
            width={75}
          />
        </div>
      );
    } else {
      const currentColor = categories.find(cat => cat.name === selectedCategory)
        .color;

      return (
        <Fragment>
          <div className="row">
            <div className="posts-title col span-1-of-2">
              <h1>{selectedCategory} Posts</h1>
            </div>

            <div className="posts-categories col span-1-of-2">
              <a
                className="btn btn-categories"
                style={{ backgroundColor: currentColor }}
                onClick={() => this.onCategoryButtonClicked()}
              >
                Categories
              </a>
            </div>
          </div>
          <div className="row">
            <div className="posts-filter col span-2-of-8">
              <Dropdown
                className="posts-filter-dropdown"
                options={options}
                onChange={e => this.setState({ sortePostBy: e.value })}
                value={this.state.sortePostBy}
                placeholder="Select an option"
              />
            </div>
          </div>

          {availablePosts.length === 0 ? (
            <EmptyState
              message={"Sorry, no post for this category was found!!!"}
            />
          ) : (
            availablePosts
              .filter(
                post =>
                  selectedCategory === "all" ||
                  post.category.name === selectedCategory
              )
              .map(post => (
                <Post
                  key={post.id}
                  postInfo={post}
                  isClickable={true}
                  handleEditPostButtonClicked={this.handleEditPostButtonClicked}
                />
              ))
          )}

          <CategoriesSelector show={this.showCategories} />

          <AddButton
            categoryColor={currentColor}
            handleAddButtonClicked={this.handleAddButtonClicked}
          />

          {this.state.isModalOpen === true && (
            <CreatePost
              handleCloseModal={this.handleCloseModal}
              selectedCategory={selectedCategory}
              isEditMode={this.postToEdit === undefined ? false : true}
              post={this.postToEdit}
            />
          )}
        </Fragment>
      );
    }
  }
}

function mapStateToProps({ categories, posts }) {
  if (posts === undefined) {
    return {};
  } else {
    return {
      categories: Object.keys(categories).map(key => categories[key]),
      posts: Object.keys(posts).map(key => ({
        ...posts[key],
        category: categories[posts[key].category]
      }))
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(fetchAllPosts()),
    getCategories: () => dispatch(fetchAllCategories())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
