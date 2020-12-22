import React, { useState, useEffect } from "react";
import Friend from "./Friend";
import axios from "axios";
import CreateGroupModal from "../Modals/CreateGroupModal";
import AddMemberModal from "../Modals/AddMemberModal";
import { v4 as uuidv4 } from "uuid";
import { Button } from "reactstrap";
import calendarImg from "../../assets/images/clip-bicycle-day-and-national-running-day.png";
import backend_url from "../../backend_url/backend_url";
import Alert from "../Modals/Alert";
import { getAllFriends } from "../../utils/API";
export default function FriendList() {
  const [friendList, setFriendList] = useState([]);
  const [values, setValues] = useState({
    friendName: "",
    friendEmail: "",
    friendFamilyName: "",
  });
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [networkMessage, setNetworkMessage] = useState([]);

  useEffect(() => {
    getAllFriends(setFriendList);
    if (JSON.parse(localStorage.getItem("userData")).groupId) {
      getGroupDetails();
    }
  }, [friendList.length]);

  const getGroupDetails = () => {
    const id = JSON.parse(localStorage.getItem("userData")).groupId;
    axios
      .get(`${backend_url}/groups/${id}`)
      .then((response) => {
        setValues({ ...values, groupDescription: response.data[0].name });
        setValues({
          ...values,
          groupDescription: response.data[0].description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createGroup = () => {
    const id = JSON.parse(localStorage.getItem("userData")).id;
    // console.log(this.state.groupTitle);
    // console.log(this.state.groupDescription);
    if (values.groupTitle && values.groupDescription) {
      const body = {
        name: values.groupTitle,
        description: values.groupDescription,
        userId: id,
      };
      axios
        .post(`${backend_url}/groups`, body)
        .then((response) => {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          // this.setState({ group: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setModal(!modal);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  const addFriend = () => {
    const invitationCode = uuidv4();
    // const { friendName, friendEmail, friendFamilyName } = this.state;
    if (values.friendName && values.friendEmail && values.friendFamilyName) {
      const userName =
        JSON.parse(localStorage.getItem("userData")).firstName +
        " " +
        JSON.parse(localStorage.getItem("userData")).lastName;
      const groupId = JSON.parse(localStorage.getItem("userData")).groupId;
      const ownerEmail = JSON.parse(localStorage.getItem("userData")).email;
      const body = {
        userName,
        email: values.friendEmail,
        groupId,
        ownerEmail,
        firstName: values.friendName,
        lastName: values.friendFamilyName,
        invitationCode,
      };
      axios
        .post(`${backend_url}/groups/inviteFriend`, body)
        .then((response) => {
          setFriendList([...friendList, response.data.user]);
          console.log("response", response);
          setNetworkMessage(response.data.message);
          setAlertModal(!alertModal);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setModal(!modal);
  };

  const friend_list = friendList
    .filter(
      (friend) => friend.id !== JSON.parse(localStorage.getItem("userData")).id
    )
    .map((friend) => {
      return <Friend friend={friend} key={uuidv4()} id={friend.id} />;
    });
  return (
    <section className="profile-container scrollable">
      <header className="profile-container__header mrg-bottom">
        {/* <nav className="header__nav">
            <input type="text" className="input-element" placeholder="Search" />
          </nav> */}
        <div className="header__text">
          <article className="profile-container__header-text">
            {JSON.parse(localStorage.getItem("userData")).groupId ? (
              <>
                <h2>{values.groupTitle}</h2>
                <h5>{values.groupDescription}</h5>
                <Button color="primary" onClick={() => setModal(!modal)}>
                  add a friend to you group
                </Button>
                <Alert
                  alertToggle={() => setAlertModal(!alertModal)}
                  alertModal={alertModal}
                  message={networkMessage}
                />
              </>
            ) : null}
          </article>
          <img src={calendarImg} className="calendar__img" />
        </div>
      </header>
      {JSON.parse(localStorage.getItem("userData")).groupId ? (
        <>
          <ul className="friend-list__container">{friend_list}</ul>
          <AddMemberModal
            modal={modal}
            toggle={() => setModal(!modal)}
            addFriend={addFriend}
            handleChange={handleChange}
          />
        </>
      ) : (
        <>
          <h2>You do not have any group</h2>
          <Button color="primary" onClick={() => setModal(!modal)}>
            Create a group
          </Button>
          <CreateGroupModal
            modal={modal}
            toggle={() => setModal(!modal)}
            createGroup={createGroup}
            handleChange={handleChange}
          />
        </>
      )}
    </section>
  );
}
