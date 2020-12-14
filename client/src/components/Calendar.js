import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import history from "../history";
const backend_url = "http://localhost:8080";
const localizer = momentLocalizer(moment);

class SampleCalendar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { events: [] };
  }

  componentDidMount() {
    console.log("calendar mounted")
    this.getAllEvents();
  }

  getAllEvents = () => {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    axios
      .get(`${backend_url}/events/${userId}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].start = new Date(response.data[i].start);
          response.data[i].end = new Date(response.data[i].end);
        }
        this.setState({ events: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSelect = ({ start, end }) => {
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
          this.setState({
            events: [...this.state.events, newEvent],
          });
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(this.state.events);
    } else {
      alert("please enter an event title");
    }
  };

  handleClick = (event) => {
    const jsonObject = JSON.stringify(event);
    const object = JSON.parse(jsonObject);
    for (let i = 0; i < this.state.events.length; i++) {
      if (object.id === this.state.events[i].id) {
        history.push(`/event/${object.id}`);
      }
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
          className="calendar-container"
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          // defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={(event) => this.handleClick(event)}
          onSelectSlot={this.handleSelect}
          style={{ width: "100%" }}
        />
      </section>
    );
  }
}

export default withRouter(SampleCalendar);
