import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import EventDetails from "../../components/Event/EventDetails";
import NavBar from "../../components/Navigation/NavBar";
import { getEventDetails } from "../../utils/API";
export default function EventPage(props) {
  const [event, setEvent] = useState({});

  useEffect(() => {
    getEventDetails(props.match.params.id, setEvent);
  }, [Object.keys(event).length]);

  return (
    <>
      <NavBar />
      <section className="calendar-page__container">
        <Sidebar />
        <EventDetails event={event} id={props.match.params.id} />
      </section>
    </>
  );
}
