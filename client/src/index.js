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

// import App from "./App";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route , Redirect} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import SignInPage from "./pages/SignInPage";

// this piece of code is referred to this resource:
// https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4 
function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/signin'}}/>}
    />
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <Route path ="/" exact component = {App}/> */}
      {/* <Route path="/signin" exact component={SignInPage} /> */}
      <Route path="/signin" exact component={LoginPage} />
      <Route path="/calendar"  exact component={CalendarPage} />
      {/* <Route path="/profile" component={ProfilePage} /> */}
      <Redirect from ="/" to ="/signin"/>
      <PrivateRoute authed={localStorage.getItem("authed")} exact path ="/profile" component ={ProfilePage}/>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
