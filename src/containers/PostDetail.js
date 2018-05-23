import React, { Component } from "react";

class PostDetail extends Component {
  render() {
    console.log(JSON.stringify(this.props.match));

    return (
      <div>
        <p>POST DETAIL</p>
        <p>Category Name: {this.props.match.params.categoryName}</p>
        <p>Post Id: {this.props.match.params.postId}</p>
      </div>
    );
  }
}

export default PostDetail;
