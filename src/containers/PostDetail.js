import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "components/Comment";

import {
  fetchPost,
  fetchAllCategories,
  votePostUp,
  votePostDown,
  fetchPostComments
} from "../actions";

class PostDetail extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getPost(this.props.match.params.postId);
    this.props.getComments(this.props.match.params.postId);
  }

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
                <h3 className="span-8-of-12 post-detail-title">
                  {/*post.title*/}Title huuuuge, very big big and I do not want
                  to let it wrap.
                </h3>
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
                <p>
                  {/*post.body*/}Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
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
          ))}}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
