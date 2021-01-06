import notification from "../../assets/Icons/notification.svg";
import React, { useState } from "react";
import DropdownSidebar from "./DropdownSidebar";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
 import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
      <Navbar color="faded" light>
        {/* <NavbarToggler onClick={toggleNavbar} className="mr-2" /> */}
        <NavbarBrand href="/" className="mr-auto">
          reactstrap
        </NavbarBrand>
        <UncontrolledDropdown className ="nav-bar__dropdown">
          <DropdownToggle nav>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          </DropdownToggle>
          <DropdownMenu right>
            {/* <DropdownItem>Option 1</DropdownItem> */}
            {/* <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem> */}
            <DropdownSidebar/>
          </DropdownMenu>
        </UncontrolledDropdown>
        {/* <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse> */}
        
  <IconButton color="inherit" style ={{width:"5rem"}}>
        <NotificationsActiveIcon
          className="sidebar-icon"
          style={{ margin: "0" }}
        />
        <p className ="notification-count"></p>
      </IconButton> 

      </Navbar>
  );
};

export default NavBar;


