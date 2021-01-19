import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

// main  css file import
import "./assets/style/main.css";
import "bootstrap/dist/css/bootstrap.min.css";

// components import section
import ProfilePage from "./pages/Account/ProfilePage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import history from "./history";
import FriendsPage from "./pages/Friend/FriendsPage";
import EventPage from "./pages/Event/EventPage";
import FriendProfileDetailsPage from "./pages/Friend/FriendProfileDetailsPage";

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
  <Router history={history}>
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
        path="/friends/:id"
        component={FriendProfileDetailsPage}
      />
      <PrivateRoute
        authed={localStorage.getItem("authed") === "true"}
        exact
        path="/event/:id"
        component={EventPage}
      />
        {/* <PrivateRoute
        authed={localStorage.getItem("authed") === "true"}
        exact
        path="/friends/:id/messaging"
        component={Messaging}
      /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
reportWebVitals();
