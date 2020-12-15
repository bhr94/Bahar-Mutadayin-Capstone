import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

// main  css file import
import "./assets/style/main.css";

// components import section
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import history from "./history";
import FriendsPage from "./pages/FriendsPage";
import EventPage from "./pages/EventPage";
import FriendProfileDetailsPage from "./pages/FriendProfileDetailsPage";

// semantic ui css import section
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

// PrivateRoute function is referred to this resource:
// https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin" }} />
        )
      }
    />
  );
}
ReactDOM.render(
  <BrowserRouter history={history}>
    <Switch>
      <PrivateRoute
        authed={localStorage.getItem("authed") === "true"}
        exact
        path="/calendar"
        component={CalendarPage}
      />
      <PrivateRoute
        authed={localStorage.getItem("authed") === "true"}
        exact
        path="/profile"
        component={ProfilePage}
      />
      <PrivateRoute
        authed={localStorage.getItem("authed") === "true"}
        exact
        path="/friends"
        component={FriendsPage}
      />
      <Route path="/signin" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />

      <Route
        exact
        path="/"
        render={() => {
          return localStorage.getItem("authed") === "true" ? (
            <Redirect to="/profile" />
          ) : (
            <Redirect to="/signin" />
          );
        }}
      />
      <PrivateRoute
        authed={localStorage.getItem("authed") === "true"}
        exact
        path="/event/:id"
        component={EventPage}
      />
      <PrivateRoute
        authed={localStorage.getItem("authed") === "true"}
        exact
        path="/friends/:id"
        component={FriendProfileDetailsPage}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
reportWebVitals();

{
  /* <Route exact path="/signin">
        {localStorage.getItem("authed") ? (
          <Redirect to="/profile" />
        ) : (
          <LoginPage />
        )}
      </Route> */
}
