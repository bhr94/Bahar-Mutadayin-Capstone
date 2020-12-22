import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { Link as RouterLink, withRouter } from "react-router-dom";
import history from "../../history";
import img from "../../assets/images/clip-keep-each-other-safe.png";
import backend_url from "../../backend_url/backend_url";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
// import FacebookIcon from "../../assets/icons-js/Facebook";
// import GoogleIcon from "../../assets/icons-js/Google";

export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      const {email, password} = values;
      const userData = {
        email,
        password,
      };
      axios
        .post(`${backend_url}/users/login`, userData)
        .then((response) => {
          console.log(response);
          if (response.data.token && response.data.user[0]) {
            localStorage.setItem("authed", true);
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user[0])
            );
            // history.push("/profile")
            window.location = "/profile";
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };


  const handleChange = (e) => {
    let name = e.target.name;
    setValues({
      ...values,
      [name]:e.target.value
    })
  };
  // this function is for facebook auth
  // const getUserData = () => {
  //   axios
  //     .get(`http://localhost:8080/profile`)
  //     .then((response) => {
  //       const { data: userData } = response;
  //       if (Object.keys(userData).length === 0) {
  //         console.log("need to login");
  //         return;
  //       } else {
  //         // this.setState({ userData: userData });
  //         const user = {
  //           userName: userData.displayName,
  //           profileImg: userData.photos[0].value,
  //         };
  //         // this.setState({ userData: user });
  //         localStorage.setItem("userData", JSON.stringify(this.state.userData));
  //         localStorage.setItem("authed", true);
  //         this.setState({ signedIn: true });
  //         console.log(this.state.userData);
  //       }
  //     })
  //     .catch((err) =>
  //       console.log("Could not get into your account, please try again")
  //     );
  // };
  const {email, password} = values;
  return (
    <section className="body-container backgrnd">
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
            //   email: "demo@devias.io",
            //   password: "Password123",
            // }}
            // validationSchema={Yup.object().shape({
            //   email: Yup.string()
            //     .email("Must be a valid email")
            //     .max(255)
            //     .required("Email is required"),
            //   password: Yup.string().max(255).required("Password is required"),
            // })}
            onSubmit={() => {
              //   navigate('/app/dashboard', { replace: true });
            }}
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
              <form>
                <Box mb={3} className="signin-header">
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  {/* <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Sign in on the internal platform
                    </Typography> */}
                </Box>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12} md={6}>
                      <Link href="http://localhost:8080/auth/facebook">
                        <Button
                          color="primary"
                          fullWidth
                          startIcon={<FacebookIcon />}
                          // onClick={this.handleSubmit}
                          size="large"
                          variant="contained"
                          style ={{background:"rebeccapurple"}}
                        >
                          Login with Facebook
                        </Button>
                      </Link>
                    </Grid> */}
                  {/* <Grid item xs={12} md={6}>
                      <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        // onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Google
                      </Button>
                    </Grid> */}
                </Grid>
                {/* <Box mt={3} mb={1}>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      or login with email address
                    </Typography>
                  </Box> */}
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
                  value={password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    // type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    style={{ background: "rebeccapurple" }}
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
      <img src={img} className="signin-img" alt ="login page img" />
    </section>
  );
}
