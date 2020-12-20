import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import img from "../assets/images/clip-994.png";
import Example from "./Example";
import NavBar from "./NavBar";
import ProfileDetails from "../components/ProfileDetails";
import ProfileCard from "../components/ProfileCard";
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
        <div className="header__text">
          <h1 className="profile-container__header-title">
            Hello {JSON.parse(localStorage.getItem("userData")).firstName}
          </h1>
        </div>
      </header>
      <main className="main-section profile-details__container">
        <ProfileCard/>
        <ProfileDetails className="profile-details" />
      </main>
    </section>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
