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

class Friend extends React.Component {
  render() {
    return (
      <>
        <Card className="card-element">
          <CardBody>
            <h2>
              {this.props.friend.firstName + " " + this.props.friend.lastName}
            </h2>
            {this.props.friend.status === "active" ? (
              <Button color="primary">
                <Link to={"/friends/" + this.props.id} className="explore-link">
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
}

export default Friend;
