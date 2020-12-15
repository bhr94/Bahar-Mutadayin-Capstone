import React from "react";
import { Comment } from "semantic-ui-react";
import avatar from "../assets/Icons/avatar.svg";
class CommentSample extends React.Component {
  state = {};
  render() {
    const { comment } = this.props;
    return (
      <Comment>
        <Comment.Avatar src={avatar} />
        <Comment.Content>
          <Comment.Author as="a">
            {/* {JSON.parse(localStorage.getItem("userData")).firstName +
              " " +
              JSON.parse(localStorage.getItem("userData")).lastName} */}
            {comment.ownerName}
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
