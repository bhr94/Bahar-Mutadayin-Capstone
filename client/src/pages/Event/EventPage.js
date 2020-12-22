import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Navigation/Sidebar";
import EventDetails from "../../components/Event/EventDetails";
import axios from "axios";
import backend_url from "../../backend_url/backend_url";
import NavBar from "../../components/Navigation/NavBar";
export default function EventPage(props) {
  const [event, setEvent] = useState({});

  useEffect(() => {
    getEventDetails();
  }, [Object.keys(event).length]);

  const getEventDetails = () => {
    console.log(props.match.params.id);
    const id = props.match.params.id;
    axios
      .get(`${backend_url}/eventsbyId/${id}`)
      .then((response) => {
        console.log("bahar", response.data[0]);
        setEvent(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
