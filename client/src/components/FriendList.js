import React from "react";
import Friend from "./Friend";
import axios from "axios";
import CreateGroupModal from "./CreateGroupModal";
import AddMemberModal from "./AddMemberModal";
import { v4 as uuidv4 } from "uuid";
import { Button } from "reactstrap";
import calendarImg from "../assets/images/clip-bicycle-day-and-national-running-day.png";
import backend_url from "../backend_url/backend_url";
import Alert from "./Alert";
class FriendList extends React.Component {
  state = {
    friendList: [],
    modal: false,
    groupTitle: "",
    groupDescription: "",
    friendEmail: "",
    friendFamilyName: "",
    friendName: "",
    group: false,
    alertModal: false,
    networkMessage: [],
  };

  componentDidMount() {
    this.getAllFriends();
    if (JSON.parse(localStorage.getItem("userData")).groupId) {
      this.getGroupDetails();
    }
  }

  getAllFriends = () => {
    const groupId = JSON.parse(localStorage.getItem("userData")).groupId;
    if (groupId) {
      axios
        .get(`${backend_url}/users/${groupId}`)
        .then((response) => {
          console.log("friend list " + response);
          this.setState({ friendList: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  getGroupDetails = () => {
    const id = JSON.parse(localStorage.getItem("userData")).groupId;
    axios
      .get(`${backend_url}/groups/${id}`)
      .then((response) => {
        this.setState({ groupTitle: response.data[0].name });
        this.setState({ groupDescription: response.data[0].description });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  alertToggle = () => {
    this.setState({ alertModal: !this.state.alertModal });
  };

  createGroup = () => {
    const id = JSON.parse(localStorage.getItem("userData")).id;
    console.log(this.state.groupTitle);
    console.log(this.state.groupDescription);
    if (this.state.groupTitle && this.state.groupDescription) {
      const body = {
        name: this.state.groupTitle,
        description: this.state.groupDescription,
        userId: id,
      };
      axios
        .post(`${backend_url}/groups`, body)
        .then((response) => {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          this.setState({ group: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.toggle();
  };

  handleChange = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  addFriend = () => {
    const invitationCode = uuidv4();
    const { friendName, friendEmail, friendFamilyName } = this.state;
    if (friendName && friendEmail && friendFamilyName) {
      const userName =
        JSON.parse(localStorage.getItem("userData")).firstName +
        " " +
        JSON.parse(localStorage.getItem("userData")).lastName;
      const groupId = JSON.parse(localStorage.getItem("userData")).groupId;
      const ownerEmail = JSON.parse(localStorage.getItem("userData")).email;
      const body = {
        userName,
        email: friendEmail,
        groupId,
        ownerEmail,
        firstName: friendName,
        lastName: friendFamilyName,
        invitationCode,
      };
      axios
        .post(`${backend_url}/groups/inviteFriend`, body)
        .then((response) => {
          this.setState({ networkMessage: response.data });
          this.alertToggle();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.toggle();
  };

  render() {
    const friend_list = this.state.friendList
      .filter(
        (friend) =>
          friend.id !== JSON.parse(localStorage.getItem("userData")).id
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
                  <h2>{this.state.groupTitle}</h2>
                  <h5>{this.state.groupDescription}</h5>
                  <Button color="primary" onClick={this.toggle}>
                    add a friend to you group
                  </Button>
                  <Alert
                    alertToggle={this.alertToggle}
                    alertModal={this.state.alertModal}
                    message={this.state.networkMessage}
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
              modal={this.state.modal}
              toggle={this.toggle}
              addFriend={this.addFriend}
              handleChange={this.handleChange}
            />
          </>
        ) : (
          <>
            <h2>You do not have any group</h2>
            <Button color="primary" onClick={this.toggle}>
              Create a group
            </Button>
            <CreateGroupModal
              modal={this.state.modal}
              toggle={this.toggle}
              createGroup={this.createGroup}
              handleChange={this.handleChange}
            />
          </>
        )}
      </section>
    );
  }
}

export default FriendList;
