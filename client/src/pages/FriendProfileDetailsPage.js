import React from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import FriendCalendar from "../components/FriendCalendar";
import backend_url from "../backend_url/backend_url";

class FriendProfileDetailsPage extends React.Component {
  render() {
    return (
      <section className="calendar-page__container">
        <Sidebar />
        <FriendCalendar id = {this.props.match.params.id}/>
      </section>
    );
  }
}

export default FriendProfileDetailsPage;
