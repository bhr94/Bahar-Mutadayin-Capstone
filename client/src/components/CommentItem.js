import React from "react";
import { Comment } from "semantic-ui-react";

class CommentSample extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <Comment>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
        <Comment.Content>
          <Comment.Author as="a">
            {JSON.parse(localStorage.getItem("userData")).firstName +
              " " +
              JSON.parse(localStorage.getItem("userData")).lastName}
          </Comment.Author>
          <Comment.Metadata>
            <div>{comment.commentDate}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.commentContent}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
            <Comment.Action>Like</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

export default CommentSample;
