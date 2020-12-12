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
        // this.setState({ userData: {} });
        localStorage.removeItem("userData");
        localStorage.setItem("authed", false);
        // this.setState({signedOut:true})
        history.push("/signin");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <aside className="container-sidebar">
        <ul className="sidebar__list">
          <NavLink className="sidebar__list-item" to="/profile">
            <img src={calendar} alt="profile-icon" className="sidebar-icon" />
            Profile
          </NavLink>
          <NavLink className="sidebar__list-item" to="/calendar">
            <img src={profile} alt="calendar-icon" className="sidebar-icon" />
            Calendar
          </NavLink>
          <NavLink className="sidebar__list-item" to="/friends">
            <img src={friends} alt="friends-icon" className="sidebar-icon" />
            Friends
          </NavLink>
          <NavLink className="sidebar__list-item" to="/status">
            <img src={status} alt="status-icon" className="sidebar-icon" />
            Status
          </NavLink>
          <button className="sidebar__list-item" onClick={this.toggle}>
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
