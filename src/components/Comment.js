import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { voteCommentUp, voteCommentDown } from "../actions";

const Comment = ({ comment, categoryColor, voteUp, voteDown }) => {
  const commentDate = new Date(comment.timestamp);

  return (
    <Fragment>
      <div className="row">
        <div
          className="span-8-of-12 comment"
          style={{ borderColor: categoryColor }}
        >
          <div className="comment-rating">
            <i
              className="icon ion-ios-arrow-up"
              style={{ color: categoryColor }}
              onClick={() => voteUp(comment.id)}
            />
            <div className="">{comment.voteScore}</div>
            <i
              className="icon ion-ios-arrow-down"
              style={{ color: categoryColor }}
              onClick={() => voteDown(comment.id)}
            />
          </div>
          <div className="comment-body">
            <p className="comment-title">
              <b>{comment.author}</b> says:
            </p>
            <p className="comment-data">
              {commentDate.toLocaleDateString() +
                " at " +
                commentDate.toLocaleTimeString()}
            </p>
            <p className="comment-message">{comment.body}</p>
            <a href="">
              <b>edit</b>
            </a>
            <a href="">
              <b>delete</b>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  categoryColor: PropTypes.string.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    voteUp: commentId => dispatch(voteCommentUp(commentId)),
    voteDown: commentId => dispatch(voteCommentDown(commentId))
  };
}

export default connect(null, mapDispatchToProps)(Comment);
