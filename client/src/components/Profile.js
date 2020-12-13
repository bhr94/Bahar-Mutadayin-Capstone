import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
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
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  // name:  localStorage.getItem("userData") &&  JSON.parse(localStorage.getItem("userData")).userName,
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
        <nav className="header__nav">
          <input type="text" className="input-element" placeholder="Search" />
        </nav>
        <div className="header__text">
          <h1 className="profile-container__header-title">Hello Bahar</h1>
          <p className="profile-container__header-text">
            This is your profile page. You can see the progress you've made with
            your work and manage your projects or assigned tasks
          </p>
        </div>
      </header>
      {/* main section of the profile */}
      <main className="main-section">
        {/* all forms container */}
        <div className="main-section__form">
          <div className="main-section__form-header">
            <h2 className="main-section__form-title">My account</h2>
          </div>

          <Card
            className={clsx(classes.root, className)}
            {...rest}
            style={{ width: "100%" }}
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
                Upload picture
              </Button>
            </CardActions> */}
          </Card>
        </div>
      </main>
    </section>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
