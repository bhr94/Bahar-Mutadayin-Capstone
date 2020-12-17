import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import img from "../assets/images/clip-994.png";
import Example from "./Example";
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

const user = {
  // avatar: localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).profileImg,
  city: "Vancouver",
  country: "Canada",
  jobTitle: "Senior Developer",
  name:
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData")).firstName +
      " " +
      JSON.parse(localStorage.getItem("userData")).lastName,
  timezone: "GTM-7",
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <section className="profile-container scrollable">
      <header className="profile-container__header">
        <Example/>
        <div className="header__text">
          <h1 className="profile-container__header-title">
            Hello {JSON.parse(localStorage.getItem("userData")).firstName}
          </h1>
        </div>
      </header>
      <main className="main-section">
        <div className="main-section__profile-container">
          <Card
            className={clsx(classes.root, className)}
            {...rest}
            style={{ width: "100%", position: "relative", top: "-100px" }}
          >
            <CardContent>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar className={classes.avatar} src={user.avatar} />
                <Typography color="textPrimary" gutterBottom variant="h3">
                  {user.name}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  {`${user.city} ${user.country}`}
                </Typography>
                <Typography
                  className={classes.dateText}
                  color="textSecondary"
                  variant="body1"
                >
                  {`${moment().format("hh:mm A")} ${user.timezone}`}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            {/* <CardActions>
              <Button color="primary" fullWidth variant="text">
                <input color="primary" fullWidth variant="text" type="file" />
              </Button>
            </CardActions> */}
          </Card>
        </div>
        <img src ={img} className ="profile__img"/>

      </main>
    </section>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
