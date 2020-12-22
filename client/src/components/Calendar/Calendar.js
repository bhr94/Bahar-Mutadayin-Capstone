import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import history from "../../history";
import backend_url from "../../backend_url/backend_url";
const localizer = momentLocalizer(moment);

export default function SampleCalendar() {
  const [events, setEvent] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, [events.length]);

  function getAllEvents() {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    axios
      .get(`${backend_url}/events/${userId}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].start = new Date(response.data[i].start);
          response.data[i].end = new Date(response.data[i].end);
        }
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSelect({ start, end }) {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    const title = window.prompt("New Event name");
    if (title) {
      const event = {
        title,
        start,
        end,
        userId,
      };
      axios
        .post(`${backend_url}/events`, event)
        .then((response) => {
          console.log(response.data);
          let newEvent = {
            title: response.data.title,
            start: new Date(response.data.start),
            end: new Date(response.data.end),
            userId: response.data.userId,
          };
          // this.setState({
          //   events: [...this.state.events, newEvent],
          // });
          setEvent([...events, newEvent]);
          console.log("events " + JSON.stringify(events));
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(events);
    } else {
      alert("please enter an event title");
    }
  }

  function handleClick(event) {
    const jsonObject = JSON.stringify(event);
    const object = JSON.parse(jsonObject);
    for (let i = 0; i < events.length; i++) {
      if (object.id === events[i].id) {
        // history.push(`/event/${object.id}`);
        window.location = `/event/${events[i].id}`;
      }
    }
  }
  return (
    <section className="profile-container scrollable">
      <header className="profile-container__header">
        <div className="header__text">
          <h1 className="profile-container__header-title">
            Hello {JSON.parse(localStorage.getItem("userData")).firstName}
          </h1>
          <h3 className="profile-container__header-text">
            It is time to add more events to your calendar.
          </h3>
        </div>
      </header>
      <Calendar
        className="calendar-container"
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.Month}
        scrollToTime={new Date(1970, 1, 1, 6)}
        // defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={handleClick}
        onSelectSlot={handleSelect}
        style={{ width: "100%" }}
      />
    </section>
  );
}
