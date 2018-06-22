import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
import { DebounceInput } from "react-debounce-input";
import Dropdown from "react-dropdown";
import { addPost } from "actions";

class CreateComment extends Component {
  state = {
    title: "",
    post: "",
    name: "",
    category:
      this.props.selectedCategory === "all" ? "" : this.props.selectedCategory
  };

  handleAddPost = () => {
    const { title, post, name, category } = this.state;

    if (
      title === "" ||
      post === "" ||
      name === "" ||
      category === "" ||
      category.toLowerCase() === "all"
    ) {
      window.alert(
        "You need to fill all fields at the form to send a new post!!!"
      );
      return;
    }

    this.props.addNewPost(title, post, name, category);
    this.props.handleCloseModal();
  };

  render() {
    const { handleCloseModal, selectedCategory, categories } = this.props;

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
        <p>New Post</p>

        <div className="row">
          <DebounceInput
            minLength={2}
            debounceTimeout={100}
            placeholder="Type a title here..."
            onChange={event => this.setState({ title: event.target.value })}
          />

          <DebounceInput
            cols="60"
            rows="7"
            element="textarea"
            forceNotifyByEnter={false}
            minLength={0}
            debounceTimeout={100}
            placeholder="What do you want to talk about this topic..."
            onChange={e => this.setState({ post: e.target.value })}
          />

          <DebounceInput
            minLength={2}
            debounceTimeout={100}
            placeholder="What's your name?"
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
        <button className="btn add" onClick={() => this.handleAddPost()}>
          Add
        </button>
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
  selectedCategory: PropTypes.string.isRequired
};

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map(key => categories[key])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPost: (title, body, author, category) =>
      dispatch(addPost(title, body, author, category))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComment);
