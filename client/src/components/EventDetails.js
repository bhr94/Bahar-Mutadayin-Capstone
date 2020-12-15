import React from "react";
import CommentList from "./CommentList";
export default function Event(props) {
  const { title, end, start} = props.event;
  return (
    <section className="profile-container scrollable">
      <header className="profile-container__header">
        <nav className="header__nav">
          <input type="text" className="input-element" placeholder="Search" />
        </nav>
        <div className="header__text">
          <h1 className="profile-container__header-title">Hello Bahar</h1>
          <p className="profile-container__header-text">
            This is your profile page. You can see the progress you've made with
            your work and manage your projects or assigned tasks
          </p>
        </div>
      </header>
      <article>
        <h2>{title}</h2>
        <p>{start}</p>
        <p>{end}</p>
      </article>

      <CommentList id = {props.id}/>
    </section>
  );
}
