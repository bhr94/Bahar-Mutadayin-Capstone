import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import history from "../../history";
import img from "../../assets/images/clip-lets-party.png";
import backend_url from "../../backend_url/backend_url";

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

export default function Register() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    invitationCode: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;
    if (firstName && lastName && email && password) {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        invitationCode,
      };
      // axios
      //   .post(
      //     `${backend_url}/users/register`,
      //     userData
      //   )
      axios({
        method: "POST",
        url: `https://cors-anywhere.herokuapp.com/${backend_url}/users/register`,
        headers: {
          "Access-Control-Allow-Origin": "https://friend-ship.netlify.app/",
        },
        data: userData,
      })
        .then((response) => {
          console.log("user response" + JSON.stringify(response));
          if (response.data.token && response.data.user) {
            localStorage.setItem("authed", true);
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
            // history.push("/profile");
            window.location = "/profile";
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  const { firstName, lastName, email, password, invitationCode } = values;
  return (
    <section className="body-container backgrnd">
      <img src={img} className="signin-img" alt="register page img" />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        className="w-400"
      >
        <Container maxWidth="sm">
          <Formik
          // initialValues={{
          //   email: "",
          //   firstName: "",
          //   lastName: "",
          //   password: "",
          //   policy: false,
          // }}
          // validationSchema={Yup.object().shape({
          //   email: Yup.string()
          //     .email("Must be a valid email")
          //     .max(255)
          //     .required("Email is required"),
          //   firstName: Yup.string()
          //     .max(255)
          //     .required("First name is required"),
          //   lastName: Yup.string()
          //     .max(255)
          //     .required("Last name is required"),
          //   password: Yup.string()
          //     .max(255)
          //     .required("password is required"),
          //   policy: Yup.boolean().oneOf(
          //     [true],
          //     "This field must be checked"
          //   ),
          // })}
          >
            {({
              errors,
              handleBlur,
              // handleChange,
              // handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              // <form onSubmit={handleSubmit}>
              <form>
                <Box mb={3} className="signin-header">
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  {/* <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create new account
                    </Typography> */}
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // value={values.firstName}
                  value={firstName}
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
                  onChange={handleChange}
                  // value={values.lastName}
                  value={lastName}
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
                  onChange={handleChange}
                  type="email"
                  // value={values.email}
                  value={email}
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
                  onChange={handleChange}
                  type="password"
                  // value={values.password}
                  value={password}
                  variant="outlined"
                />
                If you have an invitation code, please enter...
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Invitation code"
                  margin="normal"
                  name="invitationCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // value={values.lastName}
                  value={invitationCode}
                  variant="outlined"
                />
                {/* <Box alignItems="center" display="flex" ml={-1}>
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
                  </Box> */}
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    // type="submit"
                    variant="contained"
                    style={{ background: "rebeccapurple" }}
                    onClick={handleSubmit}
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
    </section>
  );
}
