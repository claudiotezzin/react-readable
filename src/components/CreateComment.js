import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
import { DebounceInput } from "react-debounce-input";
import { addComment, updateComment } from "actions";

class CreateComment extends Component {
  state = {
    body: this.props.isEditMode === true ? this.props.comment.body : "",
    author: this.props.isEditMode === true ? this.props.comment.author : ""
  };

  handleAddComment = () => {
    const { body, author } = this.state;

    if (body === "" || author === "") {
      window.alert(
        "You need to fill all fields at the form to send a new comment!!!"
      );
      return;
    }

    this.props.addNewComment(this.props.postId, body, author);
    this.props.handleCloseModal();
  };

  handleUpdateComment = () => {
    const { body, author } = this.state;

    if (body === "" || author === "") {
      window.alert(
        "You need to fill all fields at the form to edit the comment!!!"
      );
      return;
    }

    this.props.updateComment(this.props.comment.id, body, author);
    this.props.handleCloseModal();
  };

  render() {
    const { handleCloseModal, isEditMode } = this.props;

    return (
      <Modal
        isOpen={true}
        contentLabel="onRequestClose Example"
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        {isEditMode === true ? <p>Edit Comment</p> : <p>New Comment</p>}

        <div className="row">
          <DebounceInput
            cols="60"
            rows="7"
            element="textarea"
            forceNotifyByEnter={false}
            minLength={1}
            debounceTimeout={100}
            value={this.state.body}
            placeholder="Please, leave your comment here"
            onChange={e => this.setState({ body: e.target.value })}
          />

          <DebounceInput
            minLength={1}
            debounceTimeout={100}
            placeholder="What's your name?"
            value={this.state.author}
            onChange={event => this.setState({ author: event.target.value })}
          />
        </div>
        {isEditMode === true ? (
          <button
            className="btn add"
            onClick={() => this.handleUpdateComment()}
          >
            Update
          </button>
        ) : (
          <button className="btn add" onClick={() => this.handleAddComment()}>
            Add
          </button>
        )}
        <button className="btn cancel" onClick={handleCloseModal}>
          Cancel
        </button>
      </Modal>
    );
  }
  "";
}

CreateComment.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    addNewComment: (postId, body, author) =>
      dispatch(addComment(postId, body, author)),
    updateComment: (commentId, body, author) =>
      dispatch(updateComment(commentId, body, author))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CreateComment);
