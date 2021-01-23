import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import MessageContainer from "../Messaging/MessageContainer";
import { CSSTransition } from "react-transition-group";

export default function Friend(props) {
  function handleOpen() {
    document.querySelector(".message-container").style.display = "inline";
  }
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
      <CSSTransition timeout={3000} className="fade">
        <MessageContainer id="message" />
      </CSSTransition>
    </>
  );
}
