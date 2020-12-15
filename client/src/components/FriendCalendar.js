import React from "react";
import axios from "axios";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import history from "../history";

const backend_url = "http://localhost:8080";
const localizer = momentLocalizer(moment);

class FriendProfileDetailsPage extends React.Component {
  state = { events: [] };
  componentDidMount() {
    this.getAllEvents();
  }

  getAllEvents = () => {
    const userId = this.props.id;
    axios
      .get(`${backend_url}/events/${userId}`)
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].start = new Date(response.data[i].start);
          response.data[i].end = new Date(response.data[i].end);
        }
        this.setState({ events: response.data });
        console.log();
      })
      .catch((error) => {
        console.log(error);
      });
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
          defaultView={Views.Month}
          scrollToTime={new Date(1970, 1, 1, 6)}
          onSelectEvent={(event) => this.handleClick(event)}
          // defaultDate={new Date(2015, 3, 12)}
          //   onSelectEvent={(event) => this.handleClick(event)}
          //   onSelectSlot={this.handleSelect}
          style={{ width: "100%" }}
        />
      </section>
    );
  }
}

export default FriendProfileDetailsPage;
