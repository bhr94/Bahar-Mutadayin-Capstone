import React from "react";
import CommentItem from "./CommentItem";
import { Button, Comment, Form, Header } from "semantic-ui-react";

class CommentList extends React.Component {
  state = {
    comments: [
      {
        img: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
        author: "Matt",
        date: "Today at 5:42PM",
        text: "This has been very useful for my research. Thanks as well!",
      },
      {
        img: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
        author: "Matt",
        date: "Today at 5:42PM",
        text: "This has been very useful for my research. Thanks as well!",
      },
      {
        img: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
        author: "Matt",
        date: "Today at 5:42PM",
        text: "This has been very useful for my research. Thanks as well!",
      },
    ],
  };
  render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        {this.state.comments.map((comment) => {
          return <CommentItem comment={comment} />;
        })}
        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    );
  }
}

export default CommentList;
