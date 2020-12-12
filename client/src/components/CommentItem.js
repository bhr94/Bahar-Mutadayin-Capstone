import React from "react";
import { Comment} from "semantic-ui-react";

class CommentSample extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <Comment>
        <Comment.Avatar src={comment.img} />
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>{comment.date}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.text}</Comment.Text>
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
