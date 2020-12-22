import React, { useState, useEffect, useRef } from "react";
import CommentItem from "./CommentItem";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import axios from "axios";
import backend_url from "../../backend_url/backend_url";

export default function CommentList(props) {
  // https://stackoverflow.com/questions/39426083/update-react-component-every-second
  // componentDidMount() {
  //   this.interval = setInterval(() => this.getCommentsByEventId(), 3000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");


  useEffect(() => {
    const interval = setInterval(() => getCommentsByEventId(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, [comments.length]);

 


  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const getCommentsByEventId = () => {
    const id = props.id;
    axios
      .get(`${backend_url}/comments/${id}`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addComment = () => {
    const ownerId = JSON.parse(localStorage.getItem("userData")).id;
    const ownerName =
      JSON.parse(localStorage.getItem("userData")).firstName +
      " " +
      JSON.parse(localStorage.getItem("userData")).lastName;
    if (comment.length) {
      const body = {
        commentContent: comment,
        ownerId: ownerId,
        ownerName,
      };
      axios
        .post(`${backend_url}/newComment/${props.id}`, body)
        .then((response) => {
          // this.setState({
          //   comments: [...this.state.comments, response.data],
          // });
          console.log(response.data)
          setComments([...comments, response.data ]);
          setComment("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Comment.Group>
      {comments.length ? (
        <>
          <Header as="h3" dividing>
            Comments
          </Header>
          {comments.map((comment) => {
            return <CommentItem comment={comment} key={comment.id} />;
          })}
        </>
      ) : null}

      <Form reply>
        <Form.TextArea onChange={handleChange} value={comment} />
        <Button
          content="Leave a comment"
          labelPosition="left"
          icon="edit"
          primary
          value={comment}
          onClick={addComment}
          style={{ background: "rebeccapurple" }}
        />
      </Form>
    </Comment.Group>
  );
}
