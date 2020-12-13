import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

// calendar component css imports
import "./assets/style/main.css";
import "../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";

// components import section
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import reportWebVitals from "./reportWebVitals";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import history from "./history";
import FriendsPage from "./pages/FriendsPage";
import EventPage from "./pages/EventPage";

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
          <Redirect to={{ pathname: "/signin" || "/register" }} />
        )
      }
    />
  );
}
ReactDOM.render(
  <React.StrictMode>
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
        <PrivateRoute
          authed={localStorage.getItem("authed") === "true"}
          exact
          path="/status"
          component={EventPage}
        />
        <Route path="/signin" exact component={LoginPage} />
        <Route path="/register" exact component={Register} />
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
      </Switch>
    </Router>
  </React.StrictMode>,
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
