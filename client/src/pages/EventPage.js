import React from "react";
import Sidebar from "../components/Sidebar";
import EventDetails from "../components/EventDetails";
import axios from "axios";
import backend_url from "../backend_url/backend_url";
import NavBar from "../components/NavBar";
class EventPage extends React.Component {
  state = {
    event: {},
  };

  componentDidMount() {
    this.getEventDetails();
  }

  getEventDetails = () => {
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id;
    axios
      .get(`${backend_url}/eventsbyId/${id}`)
      .then((response) => {
        this.setState({ event: response.data[0] });
        console.log(this.state.event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        {/* <NavBar /> */}
        <section className="calendar-page__container">
          <Sidebar />
          <EventDetails
            event={this.state.event}
            id={this.props.match.params.id}
          />
        </section>
      </>
    );
  }
}
export default EventPage;
