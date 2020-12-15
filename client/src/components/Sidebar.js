import React from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import calendar from "../assets/Icons/calendar.svg";
import profile from "../assets/Icons/profile.svg";
import friends from "../assets/Icons/friends.svg";
import status from "../assets/Icons/status.svg";
import axios from "axios";
import history from "../history";
import ModalExample from "../components/ModalExample";

class Sidebar extends React.Component {
  state = {
    signedOut: false,
    modal: false,
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleLogout = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/logout`)
      .then((response) => {
        console.log(response);
        localStorage.removeItem("userData");
        localStorage.setItem("authed", false);
        localStorage.removeItem("userToken");
        // history.push("/signin");
        window.location = "/signin";
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <aside className="container-sidebar">
        <ul className="sidebar__list">
          <NavLink className="sidebar__list-item" to="/profile" activeClassName="nav-link__active">
            <img src={calendar} alt="profile-icon" className="sidebar-icon" />
            Profile
          </NavLink>
          <NavLink className="sidebar__list-item" to="/calendar" activeClassName="nav-link__active">
            <img src={profile} alt="calendar-icon" className="sidebar-icon" />
            Calendar
          </NavLink>
          <NavLink className="sidebar__list-item" to="/friends" activeClassName="nav-link__active">
            <img src={friends} alt="friends-icon" className="sidebar-icon" />
            Friends
          </NavLink>
          <button className="sidebar__list-item signout-button" onClick={this.toggle}>
            <img src={status} alt="status-icon" className="sidebar-icon" />
            Sign out
          </button>
        </ul>
        <ModalExample
          modal={this.state.modal}
          toggle={this.toggle}
          handleLogOut={this.handleLogout}
        />
      </aside>
    );
  }
}

export default Sidebar;
