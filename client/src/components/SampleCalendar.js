import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
const backend_url = "http://localhost:8080";
const localizer = momentLocalizer(moment);

class SampleCalendar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { events: [] };
  }

  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents = () => {
    // userId ni localStorage dan goture bilersen
    // console.log(JSON.parse(localStorage.getItem("userData")))
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    axios
      .get(`${backend_url}/events/${userId}`)
      .then((response) => {
        console.log(response);
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSelect = ({ startDate, endDate }) => {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    const title = window.prompt("New Event name");
    if (title) {
      const event = {
        title,
        startDate,
        endDate,
        userId,
      };
      axios
        .post(`${backend_url}/events`, event)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.setState({
        events: [...this.state.events, event],
      });
      console.log(this.state.events);
    } else {
      alert("please enter an event title");
    }
  };

  render() {
    return (
      <section className="profile-container scrollable">
        <header className="profile-container__header">
          <nav className="header__nav">
            <input type="text" className="input-element" placeholder="Search" />
          </nav>
          <div className="header__text">
            <h1 className="profile-container__header-title">Hello Bahar</h1>
            <p className="profile-container__header-text">
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p>
          </div>
        </header>
        <Calendar
          className="calendar-container header__text"
          style={{ width: "100%" }}
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          // defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={this.handleSelect}
          style={{ background: "#fb6340", width: "95%", height: "80vh" }}
        />
      </section>
    );
  }
}

export default SampleCalendar;
