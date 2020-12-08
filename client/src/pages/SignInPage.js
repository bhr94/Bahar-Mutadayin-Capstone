import React from "react";
import axios from "axios";
import facebook from "../assets/Icons/facebook.svg";
import google from "../assets/Icons/google.svg";
import { Link } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
//   this component has been referred to creativetim argon design dashboard signin component

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// const { REACT_APP_SERVER_PORT: PORT } = process.env;

class SignInPage extends React.Component {
  state = {
    userData: {},
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    axios
      .get(`http://localhost:8080/profile`)
      .then((response) => {
        const { data: userData } = response;
        if (Object.keys(userData).length === 0) {
          console.log("need to login");
          return;
        } else {
          console.log(userData);
          this.setState({ userData });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return Object.keys(this.state.userData).length ? (
      <section className="backgrnd">
        <Col lg="5" md="7" className="form-container">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Link
                  className="btn-neutral btn-icon"
                  color="default"
                  to={`/auth/facebook`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img alt="..." src={facebook} />
                  </span>
                  <span className="btn-inner--text">Facebook</span>
                </Link>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img alt="..." src={google} />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </section>
    ) : (
      <ProfilePage />
    );
  }
}

export default SignInPage;
