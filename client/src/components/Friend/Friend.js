import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import MessageContainer from "../Messaging/MessageContainer";

export default function Friend(props) {
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
              <Button color="success">
                <Link
                  to={"/friends/" + props.id + "/messaging"}
                  className="explore-link"
                >
                  Message
                </Link>
              </Button>
            </section>
          ) : (
            <Button color="primary">pending...</Button>
          )}
        </CardBody>
      </Card>
      <MessageContainer/>
    </>
  );
}
