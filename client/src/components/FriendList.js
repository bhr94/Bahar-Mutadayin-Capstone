import React from "react";
import Friend from "./Friend";

class FriendList extends React.Component {
  state = {
    friendList: [1, 2, 3],
  };
  render() {
    const friend_list = this.state.friendList.map((friend) => {
      return <Friend />;
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
        <ul className="friend-list__container">{friend_list}</ul>
      </section>
    );
  }
}

export default FriendList;
