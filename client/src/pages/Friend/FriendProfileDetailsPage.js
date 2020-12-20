import React from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import FriendCalendar from "../../components/Calendar/FriendCalendar";
import NavBar from "../../components/Navigation/NavBar";

class FriendProfileDetailsPage extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <section className="calendar-page__container">
          <Sidebar />
          <FriendCalendar id={this.props.match.params.id} />
        </section>
      </>
    );
  }
}

export default FriendProfileDetailsPage;
