import React from "react";
import CommentItem from "./CommentItem";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import axios from "axios";
import backend_url from "../../backend_url/backend_url";

class CommentList extends React.Component {
  state = {
    comments: [],
    comment: "",
  };
  // https://stackoverflow.com/questions/39426083/update-react-component-every-second
  componentDidMount() {
    this.interval = setInterval(() => this.getCommentsByEventId(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCommentsByEventId = () => {
    const id = this.props.id;
    axios
      .get(`${backend_url}/comments/${id}`)
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
    const ownerName =
      JSON.parse(localStorage.getItem("userData")).firstName +
      " " +
      JSON.parse(localStorage.getItem("userData")).lastName;
    if (this.state.comment.length) {
      const body = {
        commentContent: this.state.comment,
        ownerId: ownerId,
        ownerName,
      };
      axios
        .post(`${backend_url}/newComment/${this.props.id}`, body)
        .then((response) => {
          this.setState({
            comments: [...this.state.comments, response.data],
          });
          this.setState({ comment: "" });
          console.log(this.state.comments);
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        this.getCommentsByEventId();
      }, 2000);
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
          <Form.TextArea
            onChange={this.handleChange}
            value={this.state.comment}
          />
          <Button
            content="Leave a comment"
            labelPosition="left"
            icon="edit"
            primary
            value={this.state.comment}
            onClick={this.addComment}
            style={{ background: "rebeccapurple" }}
          />
        </Form>
      </Comment.Group>
    );
  }
}

export default CommentList;
