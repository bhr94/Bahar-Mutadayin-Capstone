import React from "react";
import CommentItem from "./CommentItem";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import axios from "axios";
const backend_url = "http://localhost:8080";

class CommentList extends React.Component {
  state = {
    // comments: [
    //   {
    //     img: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    //     author: "Matt",
    //     date: "Today at 5:42PM",
    //     text: "This has been very useful for my research. Thanks as well!",
    //   },
    //   {
    //     img: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    //     author: "Matt",
    //     date: "Today at 5:42PM",
    //     text: "This has been very useful for my research. Thanks as well!",
    //   },
    //   {
    //     img: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
    //     author: "Matt",
    //     date: "Today at 5:42PM",
    //     text: "This has been very useful for my research. Thanks as well!",
    //   },
    // ],
    comments: [],
    comment: "",
  };

  componentDidMount() {
    this.getCommentsByEventId();
  }

  getCommentsByEventId = () => {
    axios
      .get(`${backend_url}/comments/${this.props.id}`)
      .then((response) => {
        console.log(response);
        this.setState({ comments: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addComment = () => {
    const ownerId = JSON.parse(localStorage.getItem("userData")).id;
    if (this.state.comment.length) {
      const body = {
        commentContent: this.state.comment,
        ownerId: ownerId,
      };
      axios
        .post(`${backend_url}/newComment/${this.props.id}`, body)
        .then((response) => {
          this.setState([...this.state.comments, response.data]);
          this.setState({ comment: "" });
          console.log(this.state.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleChange = (e) => {
    this.setState({ comment: e.target.value });
  };
  render() {
    return (
      <Comment.Group>
        {this.state.comments.length ? (
          <>
            <Header as="h3" dividing>
              Comments
            </Header>
            {this.state.comments.map((comment) => {
              return <CommentItem comment={comment} />;
            })}
          </>
        ) : null}

        <Form reply>
          <Form.TextArea onChange={this.handleChange} />
          <Button
            content="Leave a comment"
            labelPosition="left"
            icon="edit"
            primary
            value={this.state.comment}
            onClick={this.addComment}
          />
        </Form>
      </Comment.Group>
    );
  }
}

export default CommentList;
