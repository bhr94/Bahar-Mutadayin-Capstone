import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function Friend(props) {
  return (
    <>
      <Card className="card-element">
        <CardBody>
          <h2>
            {props.friend.firstName + " " + props.friend.lastName}
          </h2>
          {props.friend.status === "active" ? (
            <Button color="primary">
              <Link to={"/friends/" + props.id} className="explore-link">
                Explore
              </Link>
            </Button>
          ) : (
            <Button color="primary">pending...</Button>
          )}
        </CardBody>
      </Card>
    </>
  );
}

