import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import ProfileCard from "../../components/Profile/ProfileCard";
import { makeStyles } from "@material-ui/core";
import { io } from "socket.io-client";
import backend_url from "../../backend_url/backend_url";
import { useToasts } from "react-toast-notifications";

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
  const { addToast } = useToasts();

  let socket = io(backend_url);
  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     alert(message);
        
  //     // setMessage(message);
  //   });
  //   //  console.log(socket)
  //   //  if(socket.connected) {
  //   //   addToast("User connected", {
  //   //     appearance: 'success',
  //   //     autoDismiss: true,
  //   //   })
  //   //  }
  //   // socket.emit("connection", () => {
  //   //   console.log("user joined");
  //   // });
  //   // return () => {
  //   //   socket.emit("disconnect");
  //   //   socket.off();
  //   // };
  // }, []);
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
      </main>
    </section>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
