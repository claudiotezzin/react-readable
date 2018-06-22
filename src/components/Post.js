import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { votePostUp, votePostDown, deletePost } from "../actions";

class Post extends Component {
  state = {
    redirect: false
  };

  handleOnClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const {
      voteUp,
      voteDown,
      postInfo,
      handleEditPostButtonClicked
    } = this.props;
    const postDate = new Date(postInfo.timestamp);

    if (this.state.redirect) {
      return <Redirect push to={`/${postInfo.category.name}/${postInfo.id}`} />;
    }

    return (
      <div className="row">
        <div
          className="span-10-of-12 post"
          onClick={() => this.handleOnClick()}
        >
          <div className="row">
            <div className="post-tag">
              <img
                className="post-tag-icon"
                style={{ backgroundColor: postInfo.category.color }}
                src={postInfo.category.logo}
                alt="Category Logo"
              />
            </div>
            <h3 className="span-8-of-12 post-title">{postInfo.title}</h3>
            <div>
              <i
                className="icon ion-ios-create post-icons post-edit-icon"
                style={{ color: postInfo.category.color }}
                onClick={e => {
                  e.stopPropagation();
                  handleEditPostButtonClicked(postInfo);
                }}
              />
              <i
                className="icon ion-ios-close post-icons post-close-icon"
                onClick={e => {
                  e.stopPropagation();
                  if (
                    window.confirm("Are you sure you wish to delete this post?")
                  ) {
                    this.props.deletePost(postInfo.id);
                  }
                }}
              />
            </div>
          </div>
          <div className="line-separator" />
          <div className="span-8-of-12 post-body">
            <p>{postInfo.body}</p>
          </div>
          <div className="post-rating-info">
            <i
              className="icon ion-ios-arrow-down post-rating-icons"
              style={{ color: postInfo.category.color }}
              onClick={() => voteDown(postInfo.id)}
            />
            <div className="post-rating-value">{postInfo.voteScore}</div>
            <i
              className="icon ion-ios-arrow-up post-rating-icons"
              style={{ color: postInfo.category.color }}
              onClick={() => voteUp(postInfo.id)}
            />
            <p className="post-comments">{postInfo.commentCount} comments</p>
          </div>
          <div className="post-footer">
            <p>{postInfo.author}</p>
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
    );
  }
}

Post.propTypes = {
  postInfo: PropTypes.object.isRequired,
  handleEditPostButtonClicked: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    voteUp: postId => dispatch(votePostUp(postId)),
    voteDown: postId => dispatch(votePostDown(postId)),
    deletePost: postId => dispatch(deletePost(postId))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Post);
