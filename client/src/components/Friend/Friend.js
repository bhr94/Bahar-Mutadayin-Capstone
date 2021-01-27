import React, { useState, useEffect } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import MessageContainer from "../Messaging/MessageContainer";
import { CSSTransition } from "react-transition-group";
import { io } from "socket.io-client";
import backend_url from "../../backend_url/backend_url";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
export default function Friend(props) {
  function handleOpen() {
    document.querySelector(".message-container").style.display = "inline";
    document.getElementById("input").focus();
  }
  const { addToast } = useToasts();
  const [serverMessage, setMessage] = useState("");
  function sendMessage(message) {
    const body = { message };
    axios
      .post(`${backend_url}/friends/chat/messaging`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    socket.emit("chatMessage", message);
    // addToast(message, {
    //   appearance: 'success',
    //   autoDismiss: true,
    // })
  }

  let socket = io(backend_url);
  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      // setMessage(message);
    });
    let name = JSON.stringify(localStorage.getItem("userData")).firstName;
    socket.emit("join", { name });
    //  console.log(socket)
    //  if(socket.connected) {
    //   addToast("User connected", {
    //     appearance: 'success',
    //     autoDismiss: true,
    //   })
    //  }
    // socket.emit("connection", () => {
    //   console.log("user joined");
    // });
    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, [backend_url]);
  return (
    <>
      <Card className="card-element">
        <CardBody>
          <h2>{props.friend.firstName + " " + props.friend.lastName}</h2>
          {props.friend.status === "active" ? (
            <section className="card-element__footer">
              <Button color="primary">
                <Link to={"/friends/" + props.id} className="explore-link">
                  Explore
                </Link>
              </Button>
              <Button color="success" onClick={handleOpen}>
                Message
              </Button>
            </section>
          ) : (
            <Button color="primary">pending...</Button>
          )}
        </CardBody>
      </Card>
      <MessageContainer id="message" sendMessage={sendMessage} />
    </>
  );
}
