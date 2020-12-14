import React from "react";
import Sidebar from "../components/Sidebar";
import EventDetails from "../components/EventDetails";
import axios from "axios";
const backend_url = "http://localhost:8080";
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <section className="calendar-page__container">
        <Sidebar />
        <EventDetails event = {this.state.event} id = {this.props.match.params.id}/>
      </section>
    );
  }
}
export default EventPage;
