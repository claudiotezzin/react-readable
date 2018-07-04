import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "components/Comment";
import AddButton from "components/AddButton";
import CreateComment from "components/CreateComment";
import Post from "components/Post";
import CreatePost from "components/CreatePost";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";

import {
  fetchPost,
  fetchAllCategories,
  votePostUp,
  votePostDown,
  fetchPostComments
} from "../actions";
import ErrorComponent from "../components/ErrorComponent";

class PostDetail extends Component {
  state = {
    isCommentModalOpen: false,
    isPostModalOpen: false,
    isLoading: true
  };

  commentToEdit = undefined;
  postToEdit = undefined;

  componentDidMount() {
    Promise.all([
      this.props.getCategories(),
      this.props.getPost(this.props.match.params.postId),
      this.props.getComments(this.props.match.params.postId)
    ]).then(() => {
      console.log("I did everything!");
      this.setState({ isLoading: false });
    });
  }

  handleAddButtonClicked = () => {
    this.setState({
      isCommentModalOpen: true
    });
  };

  handleCloseModal = () => {
    this.commentToEdit = undefined;
    this.postToEdit = undefined;
    this.setState({
      isCommentModalOpen: false,
      isPostModalOpen: false
    });
  };

  handleEditCommentButtonClicked = comment => {
    this.commentToEdit = comment;
    this.setState({
      isCommentModalOpen: true
    });
  };

  handleEditPostButtonClicked = post => {
    this.postToEdit = post;
    this.setState({
      isPostModalOpen: true
    });
  };

  render() {
    const { posts, comments } = this.props;

    const post = posts.find(p => p.id === this.props.match.params.postId);
    if (this.state.isLoading === true) {
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
    } else if (post === undefined) {
      return <ErrorComponent message={`This post was not found!`} />;
    } else if (post.deleted === true) {
      return <Redirect push to={"/"} />;
    } else {
      return (
        <div>
          <Post
            key={post.id}
            postInfo={post}
            isClickable={false}
            handleEditPostButtonClicked={this.handleEditPostButtonClicked}
          />
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              categoryColor={post.category.color}
              handleEditCommentButtonClicked={
                this.handleEditCommentButtonClicked
              }
            />
          ))}
          <AddButton
            categoryColor={post.category.color}
            handleAddButtonClicked={this.handleAddButtonClicked}
          />
          <i
            className="icon ion-ios-arrow-round-back back-button"
            style={{ color: post.category.color }}
            onClick={this.props.history.goBack}
          />

          {this.state.isCommentModalOpen === true && (
            <CreateComment
              handleCloseModal={this.handleCloseModal}
              postId={post.id}
              isEditMode={this.commentToEdit === undefined ? false : true}
              comment={this.commentToEdit}
            />
          )}

          {this.state.isPostModalOpen === true && (
            <CreatePost
              handleCloseModal={this.handleCloseModal}
              selectedCategory={post.category.name}
              isEditMode={this.postToEdit === undefined ? false : true}
              post={this.postToEdit}
            />
          )}
        </div>
      );
    }
  }
}

function mapStateToProps({ categories, posts, comments }) {
  return {
    posts: Object.keys(posts).map(key => ({
      ...posts[key],
      category: categories[posts[key].category]
    })),
    comments: Object.keys(comments).map(key => comments[key])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: postId => dispatch(fetchPost(postId)),
    getCategories: () => dispatch(fetchAllCategories()),
    getComments: postId => dispatch(fetchPostComments(postId)),
    voteUp: postId => dispatch(votePostUp(postId)),
    voteDown: postId => dispatch(votePostDown(postId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
