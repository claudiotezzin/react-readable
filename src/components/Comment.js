import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { voteCommentUp, voteCommentDown, deleteComment } from "../actions";

const Comment = ({
  comment,
  categoryColor,
  handleEditCommentButtonClicked,
  voteUp,
  voteDown,
  deleteComment
}) => {
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
            <a
              onClick={e => {
                e.stopPropagation();
                handleEditCommentButtonClicked(comment);
              }}
            >
              <b>edit</b>
            </a>
            <a
              onClick={e => {
                e.stopPropagation();
                if (
                  window.confirm(
                    "Are you sure you wish to delete this comment?"
                  )
                ) {
                  deleteComment(comment.id);
                }
              }}
            >
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
  categoryColor: PropTypes.string.isRequired,
  handleEditCommentButtonClicked: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    voteUp: commentId => dispatch(voteCommentUp(commentId)),
    voteDown: commentId => dispatch(voteCommentDown(commentId)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Comment);
