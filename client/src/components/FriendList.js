import React from "react";
import Friend from "./Friend";
import axios from "axios";
import CreateGroupModal from "./CreateGroupModal";
const backend_url = "http://localhost:8080";
class FriendList extends React.Component {
  state = {
    friendList: [],
    modal: false,
    groupTitle: "",
    groupDescription: "",
  };

  componentDidMount() {
    this.getAllFriends();
  }

  getAllFriends = () => {
    const groupId = JSON.parse(localStorage.getItem("userData")).groupId;
    if (groupId) {
      axios
        .get(`${backend_url}/users/${groupId}`)
        .then((response) => {
          this.setState({ friendList: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  createGroup = () => {
    const id = JSON.parse(localStorage.getItem("userData")).id;
    if (this.state.groupTitle && this.state.groupDescription) {
      const body = {
        name: this.state.groupTitle,
        description: this.state.groupDescription,
        userId: id,
      };
      axios.post(`${backend_url}/groups`, body)
      .then(response =>{
        console.log(response);
        localStorage.setItem("userData", response.data)
      })
      .catch(error =>{
        console.log(error)
      })
    }
  
  };

  handleChange = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  render() {
    const friend_list = this.state.friendList.map((friend) => {
      return <Friend friend={friend} />;
    });
    return (
      <section className="profile-container scrollable">
        <header className="profile-container__header">
          <nav className="header__nav">
            <input type="text" className="input-element" placeholder="Search" />
          </nav>
          <div className="header__text">
            <h1 className="profile-container__header-title">Hello Bahar</h1>
            <p className="profile-container__header-text">
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p>
          </div>
        </header>
        {JSON.parse(localStorage.getItem("userData")).groupId &&
        this.state.friendList.length ? (
          <ul className="friend-list__container">{friend_list}</ul>
        ) : (
          <>
            <h2>You do not have any group</h2>
            <button onClick={this.toggle}>Create a group</button>
            <CreateGroupModal
              modal={this.state.modal}
              toggle={this.toggle}
              handleChange={this.handleChange}
              createGroup={this.createGroup}
            />
          </>
        )}
      </section>
    );
  }
}

export default FriendList;
