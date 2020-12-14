import React from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import history from "../history";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
{
  /* I have used material ui login component for this component */
}

const backend_url = "http://localhost:8080";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  handleChange = (e) => {
    let name = e.target.name;
    // let value = e.target.name.value;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    if (firstName && lastName && email && password) {
      const userData = this.state;
      axios.post(`${backend_url}/users/register`, userData).then((response) => {
        console.log(response);
        if (response.data.token && response.data.user) {
          localStorage.setItem("authed", true);
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          history.push("/profile");
        }
      })
      .catch(error=>{
        alert(error)
      })
    }
  };

  render() {
    return (
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              policy: false,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              firstName: Yup.string()
                .max(255)
                .required("First name is required"),
              lastName: Yup.string().max(255).required("Last name is required"),
              password: Yup.string().max(255).required("password is required"),
              policy: Yup.boolean().oneOf([true], "This field must be checked"),
            })}
            // onSubmit={() => {
            //   navigate('/app/dashboard', { replace: true });
            // }}
          >
            {({
              errors,
              handleBlur,
              // handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              // <form onSubmit={handleSubmit}>
              <form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={this.handleChange}
                  // value={values.firstName}
                  value={this.state.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={this.handleChange}
                  // value={values.lastName}
                  value={this.state.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={this.handleChange}
                  type="email"
                  // value={values.email}
                  value={this.state.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={this.handleChange}
                  type="password"
                  // value={values.password}
                  value={this.state.password}
                  variant="outlined"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={this.handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{" "}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={this.handleSubmit}
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/signin" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    );
  }
}

export default Register;
