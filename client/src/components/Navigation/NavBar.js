import notification from "../../assets/Icons/notification.svg";

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
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="notification-container"
      ></Navbar.Collapse>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <IconButton color="inherit" style ={{width:"5rem"}}>
        <NotificationsActiveIcon
          className="sidebar-icon"
          style={{ margin: "0" }}
        />
        <p className ="notification-count"></p>
      </IconButton>
    </Navbar>
  );
}
