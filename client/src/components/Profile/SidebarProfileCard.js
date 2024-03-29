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

const SidebarProfileCard = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
      className="profile-card"
    >
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar
            className={classes.avatar}
            src={user.avatar}
            alt="profile avatar img"
          />
          <Typography color="textPrimary" gutterBottom>
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
  );
};

SidebarProfileCard.propTypes = {
  className: PropTypes.string,
};

export default SidebarProfileCard;
