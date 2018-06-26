import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
import { DebounceInput } from "react-debounce-input";
import Dropdown from "react-dropdown";
import { addPost, updatePost } from "actions";

class CreatePost extends Component {
  state = {
    title: this.props.isEditMode === true ? this.props.post.title : "",
    body: this.props.isEditMode === true ? this.props.post.body : "",
    name: this.props.isEditMode === true ? this.props.post.author : "",
    category:
      this.props.isEditMode === true
        ? this.props.post.category.name
        : this.props.selectedCategory === "all"
          ? ""
          : this.props.selectedCategory
  };

  handleAddPost = () => {
    const { title, body, name, category } = this.state;

    if (
      title === "" ||
      body === "" ||
      name === "" ||
      category === "" ||
      category.toLowerCase() === "all"
    ) {
      window.alert(
        "You need to fill all fields at the form to send a new post!!!"
      );
      return;
    }

    this.props.addNewPost(title, body, name, category);
    this.props.handleCloseModal();
  };

  handleUpdatePost = () => {
    const { title, body, name, category } = this.state;

    if (
      title === "" ||
      body === "" ||
      name === "" ||
      category === "" ||
      category.toLowerCase() === "all"
    ) {
      window.alert(
        "You need to fill all fields at the form to edit the post!!!"
      );
      return;
    }

    this.props.updatePost(this.props.post.id, title, body, name, category);
    this.props.handleCloseModal();
  };

  render() {
    const {
      handleCloseModal,
      selectedCategory,
      categories,
      isEditMode
    } = this.props;

    const categoriesNames = Object.keys(categories)
      .map(key => categories[key].name)
      .filter(name => name !== "all");

    return (
      <Modal
        isOpen={true}
        contentLabel="onRequestClose Example"
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        {isEditMode === true ? <p>Edit Post</p> : <p>New Post</p>}

        <div className="row">
          <DebounceInput
            minLength={1}
            debounceTimeout={100}
            placeholder="Type a title here..."
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />

          <DebounceInput
            cols="60"
            rows="7"
            element="textarea"
            forceNotifyByEnter={false}
            minLength={1}
            debounceTimeout={100}
            value={this.state.body}
            placeholder="What do you want to talk about this topic..."
            onChange={e => this.setState({ body: e.target.value })}
          />

          <DebounceInput
            minLength={1}
            debounceTimeout={100}
            placeholder="What's your name?"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
          />
        </div>
        <div className="row">
          {selectedCategory === "all" ? (
            <Dropdown
              className="category-dropdown"
              options={categoriesNames}
              value={this.state.category}
              onChange={event => this.setState({ category: event.value })}
              placeholder="category"
            />
          ) : (
            <div className="category-selected">{selectedCategory}</div>
          )}
        </div>
        {isEditMode === true ? (
          <button className="btn add" onClick={() => this.handleUpdatePost()}>
            Update
          </button>
        ) : (
          <button className="btn add" onClick={() => this.handleAddPost()}>
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

CreatePost.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired
};

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map(key => categories[key])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPost: (title, body, author, category) =>
      dispatch(addPost(title, body, author, category)),
    updatePost: (postId, title, body, author, category) =>
      dispatch(updatePost(postId, title, body, author, category))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);
