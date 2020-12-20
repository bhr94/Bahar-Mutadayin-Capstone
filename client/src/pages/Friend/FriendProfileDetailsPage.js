import React from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import FriendCalendar from "../../components/Calendar/FriendCalendar";
import NavBar from "../../components/Navigation/NavBar";

export default function FriendProfileDetailsPage(props) {
  return (
    <>
      <NavBar />
      <section className="calendar-page__container">
        <Sidebar />
        <FriendCalendar id={props.match.params.id} />
      </section>
    </>
  );
}
