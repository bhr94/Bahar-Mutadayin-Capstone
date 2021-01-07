import notification from "../../assets/Icons/notification.svg";
import React, { useState } from "react";
import DropdownSidebar from "./DropdownSidebar";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import {
  IconButton,
} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar color="faded" light>
      {/* <NavbarToggler onClick={toggleNavbar} className="mr-2" /> */}
      <NavbarBrand href="/" className="mr-auto" style ={{"color": "rebeccapurple", "font-weight": "bold", "font-size": "2rem"}}>
        FriendShip
      </NavbarBrand>
      <UncontrolledDropdown className="nav-bar__dropdown">
        <DropdownToggle nav>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownSidebar />
        </DropdownMenu>
      </UncontrolledDropdown>
      <IconButton color="inherit" style={{ width: "5rem" }}>
        <NotificationsActiveIcon
          className="sidebar-icon"
          style={{ margin: "0" }}
        />
        <p className="notification-count"></p>
      </IconButton>
    </Navbar>
  );
};

export default NavBar;
