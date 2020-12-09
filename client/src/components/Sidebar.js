import React from "react";
import { NavLink, Switch, Route} from "react-router-dom";
import calendar from "../assets/Icons/calendar.svg";
import profile from "../assets/Icons/profile.svg";
import friends from "../assets/Icons/friends.svg";
import status from "../assets/Icons/status.svg";
import Calendar from "./Calendar";
import axios from "axios";
class Sidebar extends React.Component {



  handleLogout = () => {
    axios
      .get(`http://localhost:8080/auth/logout`)
      .then((response) => {
        console.log(response);
        this.setState({ userData: {} });
        localStorage.removeItem('userData');
        localStorage.setItem("authed", false)
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
          <button className="sidebar__list-item" onClick ={this.handleLogout}>
            <img src={status} alt="status-icon" className="sidebar-icon" />
            Sign out
          </button>
        </ul>
      </aside>
    );
  }
}

export default Sidebar;