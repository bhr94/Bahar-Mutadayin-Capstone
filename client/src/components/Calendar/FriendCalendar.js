import React, { useState, useEffect } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import history from "../../history";

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
import { loadFriendDetails, getFriendsEvents } from "../../utils/API";
const localizer = momentLocalizer(moment);

export default function FriendProfileDetailsPage(props) {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getFriendsEvents(props.id, setEvents);
    return () => {
      loadFriendDetails(setUser, props.id);
    };
  }, [events.length]);

  const handleClick = (event) => {
    const jsonObject = JSON.stringify(event);
    const object = JSON.parse(jsonObject);
    for (let i = 0; i < events.length; i++) {
      if (object.id === events[i].id) {
        // history.push(`/event/${object.id}`);
        window.location = `/event/${object.id}`;
      }
    }
  };

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
                {user.firstName + " " + user.lastName}
              </Typography>
              {/* <Typography color="textSecondary" variant="body1">
                  {`${state.user.city} ${state.user.country}`}
                </Typography> */}
              {/* <Typography
                  // className={classes.dateText}
                  color="textSecondary"
                  variant="body1"
                >
                  {`${moment().format("hh:mm A")} ${state.user.timezone}`}
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
        events={events}
        defaultView={Views.Month}
        scrollToTime={new Date(1970, 1, 1, 6)}
        onSelectEvent={handleClick}
        // defaultDate={new Date(2015, 3, 12)}
        //   onSelectEvent={(event) => handleClick(event)}
        //   onSelectSlot={handleSelect}
        style={{ width: "100%" }}
      />
    </section>
  );
}

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
