import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import history from "../history";
import ModalExample from "../components/ModalExample";
import backend_url from "../backend_url/backend_url";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import HttpsIcon from "@material-ui/icons/Https";
import ProfileCard from "./ProfileCard";
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
      .get(`${backend_url}/logout`)
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
        <ProfileCard />
        <ul className="sidebar__list">
          <NavLink
            className="sidebar__list-item"
            to="/profile"
            activeClassName="nav-link__active"
          >
            {/* <img src={calendar} alt="profile-icon" className="sidebar-icon" /> */}
            <AccountCircleIcon className="sidebar-icon" />
            Account
          </NavLink>
          <NavLink
            className="sidebar__list-item"
            to="/calendar"
            activeClassName="nav-link__active"
          >
            <EventAvailableIcon className="sidebar-icon" />
            Calendar
          </NavLink>
          <NavLink
            className="sidebar__list-item"
            to="/friends"
            activeClassName="nav-link__active"
          >
            <GroupAddIcon className="sidebar-icon" />
            Friends
          </NavLink>
          <button
            className="sidebar__list-item signout-button"
            onClick={this.toggle}
          >
            <HttpsIcon className="sidebar-icon" />
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
