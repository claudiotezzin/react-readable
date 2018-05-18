import React, { Component } from "react";
import UdacityIcon from "assets/images/udacity-orange.jpg";

class Post extends Component {
  render() {
    return (
      <div className="row">
        <div className="span-10-of-12 post">
          <div className="row">
            <div className="post-tag">
              <img className="post-tag-icon" src={UdacityIcon} alt="Udacity" />
            </div>
            <h3 className="span-8-of-12 post-title">
              A very veru long and interesting title
            </h3>
            <div>
              <i
                className="icon ion-ios-create post-icons post-edit-icon"
                onClick={() => {}}
              />
              <i
                className="icon ion-ios-close post-icons post-close-icon"
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="line-separator" />
          <div className="span-8-of-12 post-body">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="post-rating-info">
            <i
              className="icon ion-ios-arrow-down post-rating-icons"
              onClick={() => {}}
            />
            <div className="post-rating-value">24</div>
            <i
              className="icon ion-ios-arrow-up post-rating-icons"
              onClick={() => {}}
            />
            <p className="post-comments">20 comments</p>
          </div>
          <div className="post-footer">
            <p>Claudio Tezzin</p>
            <p>20/05/2018</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
