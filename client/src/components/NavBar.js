import notification from "../assets/Icons/notification.svg";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";

import {
  Navbar,
  NavDropdown,
  Form,
  Nav,
  FormControl,
  Button,
} from "react-bootstrap";

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
export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/profile" className="logo">
        FriendShip
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav" className="notification-container">
      </Navbar.Collapse>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <IconButton color="inherit">
        <NotificationsActiveIcon className="sidebar-icon" />
        {/* <p style ={{}}>3</p> */}
      </IconButton>
    </Navbar>
  );
}
