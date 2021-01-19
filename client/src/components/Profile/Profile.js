import React from "react";
import PropTypes from "prop-types";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import ProfileCard from "../../components/Profile/ProfileCard";
import MessageContainer from "../Messaging/MessageContainer";
import { makeStyles } from "@material-ui/core";

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
        <ProfileCard />
        <ProfileDetails className="profile-details" />
        <MessageContainer/>
      </main>
    </section>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
