import React from "react";
import Friend from "./Friend";
import axios from "axios";
import CreateGroupModal from "./CreateGroupModal";
import AddMemberModal from "./AddMemberModal";
import { v4 as uuidv4 } from "uuid";

const backend_url = "http://localhost:8080";
class FriendList extends React.Component {
  state = {
    friendList: [],
    modal: false,
    groupTitle: "",
    groupDescription: "",
    friendEmail:""
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
          console.log("friend list " + response)
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
        console.log(response.data);
        this.setState({ groupTitle: response.data.name });
        this.setState({ groupDescription: response.data.description });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
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
          console.log(response);
          localStorage.setItem("userData", JSON.stringify(response.data.user));
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
    if(this.state.friendEmail) {
      const userName = JSON.parse(localStorage.getItem("userData")).firstName + " " + JSON.parse(localStorage.getItem("userData")).lastName;
      const groupId =  JSON.parse(localStorage.getItem("userData")).groupId;
      const ownerEmail = JSON.parse(localStorage.getItem("userData")).email;
      const body = {
          userName,
          email:this.state.friendEmail,
          groupId,
          ownerEmail
      }
      axios.post(`${backend_url}/groups/inviteFriend`,body )
      .then(response =>{
        alert(response.data)
      })
      .catch(error =>{
        console.log(error)
      })
    }
    this.toggle()
  };

  render() {
    const friend_list = this.state.friendList.map((friend) => {
      return <Friend friend={friend} key={uuidv4()} id = {friend.id} />;
    });
    return (
      <section className="profile-container scrollable">
        <header className="profile-container__header">
          <nav className="header__nav">
            <input type="text" className="input-element" placeholder="Search" />
          </nav>
          <div className="header__text">
            <h1 className="profile-container__header-title">Hello Tural</h1>
            <p className="profile-container__header-text">
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
              {JSON.parse(localStorage.getItem("userData")).groupId ? (
                <button onClick={this.toggle}>
                  add a friend to you group
                </button>
              ) : null}
            </p>
          </div>
        </header>
        {JSON.parse(localStorage.getItem("userData")).groupId ? (
          <>
            <h2>{this.state.groupTitle}</h2>
            <h5>{this.state.groupDescription}</h5>
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
            <button onClick={this.toggle}>Create a group</button>
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
