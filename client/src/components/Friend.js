import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap";

class Friend extends React.Component {
  render() {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <CardImg
            alt="..."
            // src={require("assets/img/theme/img-1-1000x900.jpg")}
            src = "https://demos.creative-tim.com/argon-dashboard-react/static/media/img-1-1000x900.b20ea51c.jpg"
            top
          />
          <CardBody>
            <CardTitle>{this.props.friend.firstName}</CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </CardText>
            <Button
              color="primary"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Go somewhere
            </Button>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default Friend;