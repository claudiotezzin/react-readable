import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "components/Comment";
import AddButton from "components/AddButton";
import CreateComment from "components/CreateComment";

import {
  fetchPost,
  fetchAllCategories,
  votePostUp,
  votePostDown,
  fetchPostComments
} from "../actions";

class PostDetail extends Component {
  state = {
    isModalOpen: false
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getPost(this.props.match.params.postId);
    this.props.getComments(this.props.match.params.postId);
  }

  handleAddButtonClicked = () => {
    this.setState({
      isModalOpen: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  render() {
    const { post, voteUp, voteDown, comments } = this.props;

    if (
      post === undefined ||
      post.category === undefined ||
      comments === undefined
    ) {
      return <div>LOADING...</div>;
    } else {
      const postDate = new Date(post.timestamp);

      return (
        <div>
          <div className="row">
            <div className="span-10-of-12 post-detail">
              <div className="row">
                <div className="post-tag">
                  <img
                    className="post-tag-icon"
                    style={{ backgroundColor: post.category.color }}
                    src={post.category.logo}
                    alt="Category Logo"
                  />
                </div>
                <h3 className="span-8-of-12 post-detail-title">{post.title}</h3>
                <div>
                  <i
                    className="icon ion-ios-create post-icons post-edit-icon"
                    style={{ color: post.category.color }}
                    onClick={() => {}}
                  />
                  <i
                    className="icon ion-ios-close post-icons post-close-icon"
                    onClick={() => {}}
                  />
                </div>
              </div>
              <div className="line-separator" />
              <div className="span-8-of-12 post-detail-body">
                <p>{post.body}</p>
              </div>
              <div className="post-rating-info">
                <i
                  className="icon ion-ios-arrow-down post-rating-icons"
                  style={{ color: post.category.color }}
                  onClick={() => voteDown(post.id)}
                />
                <div className="post-rating-value">{post.voteScore}</div>
                <i
                  className="icon ion-ios-arrow-up post-rating-icons"
                  style={{ color: post.category.color }}
                  onClick={() => voteUp(post.id)}
                />
                <p className="post-comments">{post.commentCount} comments</p>
              </div>
              <div className="post-footer">
                <p>{post.author}</p>
                <p>
                  {postDate.toLocaleDateString() +
                    " - " +
                    postDate.getHours() +
                    ":" +
                    ("0" + postDate.getMinutes()).substr(-2)}
                </p>
              </div>
            </div>
          </div>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              categoryColor={post.category.color}
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

          {this.state.isModalOpen === true && (
            <CreateComment
              handleCloseModal={this.handleCloseModal}
              selectedCategory={"all"}
            />
          )}
        </div>
      );
    }
  }
}

function mapStateToProps({ categories, posts, comments }, ownProps) {
  const post = posts[ownProps.match.params.postId];

  if (post === undefined) {
    return {};
  } else {
    return {
      post: {
        ...post,
        category: categories[post.category]
      },
      comments: Object.keys(comments).map(key => comments[key])
    };
  }
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
