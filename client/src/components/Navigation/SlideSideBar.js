import React from "react";
import { slide as Menu } from "react-burger-menu";
import Sidebar from "./Sidebar";
class Example extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu className = "slide-sidebar__container">
        <Sidebar />
      </Menu>
    );
  }
}

export default Example;
