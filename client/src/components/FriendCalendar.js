import React from "react";
import axios from "axios";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import history from "../history";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
const backend_url = "http://localhost:8080";
const localizer = momentLocalizer(moment);

class FriendProfileDetailsPage extends React.Component {
  state = {
    events: [],
    user: {},
  };
  componentDidMount() {
    this.getAllEvents();
    this.loadFriendDetails();
  }

  loadFriendDetails = () => {
    axios
      .get(`${backend_url}/usersById/${this.props.id}`)
      .then((response) => {
        console.log(response);
        this.setState({ user: response.data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        // history.push(`/event/${object.id}`);
        window.location = `/event/${object.id}`;
      }
    }
  };

  render() {
    return (
      <section className="profile-container scrollable">
        <header className="profile-container__header">
          <Card
            // className={clsx(classes.root, className)}
            style={{ width: "100%" }}
          >
            <CardContent>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar />
                <Typography color="textPrimary" gutterBottom variant="h3">
                  {this.state.user.firstName + " " + this.state.user.lastName}
                </Typography>
                {/* <Typography color="textSecondary" variant="body1">
                  {`${this.state.user.city} ${this.state.user.country}`}
                </Typography> */}
                {/* <Typography
                  // className={classes.dateText}
                  color="textSecondary"
                  variant="body1"
                >
                  {`${moment().format("hh:mm A")} ${this.state.user.timezone}`}
                </Typography> */}
              </Box>
            </CardContent>
            <Divider />
            {/* <CardActions>
              <Button color="primary" fullWidth variant="text">
                <input color="primary" fullWidth variant="text" type="file" />
              </Button>
            </CardActions> */}
          </Card>
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

// user: {
//   // avatar: localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).profileImg,
//   city: "Los Angeles",
//   country: "USA",
//   jobTitle: "Senior Developer",
//   name:
//     localStorage.getItem("userData") &&
//     JSON.parse(localStorage.getItem("userData")).firstName +
//       " " +
//       JSON.parse(localStorage.getItem("userData")).lastName,
//   timezone: "GTM-7",
// },
