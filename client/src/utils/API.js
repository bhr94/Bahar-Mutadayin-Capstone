import axios from "axios";
import backend_url from "../backend_url/backend_url";


export function getAllEvents(setEvent) {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    axios
      .get(`${backend_url}/events/${userId}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].start = new Date(response.data[i].start);
          response.data[i].end = new Date(response.data[i].end);
        }
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

export const loadFriendDetails = (setUser, id) => {
    axios 
      .get(`${backend_url}/usersById/${id}`)
      .then((response) => {
        console.log(response);
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  export const getFriendsEvents = (userId,setEvents) => {
    // const userId = props.id;
    axios
      .get(`${backend_url}/events/${userId}`)
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].start = new Date(response.data[i].start);
          response.data[i].end = new Date(response.data[i].end);
        }
        setEvents(response.data);
        console.log();
      })
      .catch((error) => {
        console.log(error);
      });
  };



  export function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }



  export const getCommentsByEventId = (setComments, id) => {
    // const id = props.id;
    axios
      .get(`${backend_url}/comments/${id}`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  export  const getAllFriends = (setFriendList) => {
    const groupId = JSON.parse(localStorage.getItem("userData")).groupId;
    if (groupId) {
      axios
        .get(`${backend_url}/users/${groupId}`)
        .then((response) => {
          console.log("friend list " + JSON.stringify(response));
          setFriendList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

export const getEventDetails = (id,setEvent) => {
    // const id = props.match.params.id;
    axios
      .get(`${backend_url}/eventsbyId/${id}`)
      .then((response) => {
        setEvent(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
