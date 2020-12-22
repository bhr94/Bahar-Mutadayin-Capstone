import React from "react";
import CommentList from "../Comment/CommentList";
import img from "../../assets/images/pablita-636.png";
export default function Event(props) {
  const { title, end, start } = props.event;
  return (
    <section className="profile-container scrollable">
      <header className="profile-container__header dspl-flx">
        <img src={img} className="event-img" alt ="event header img"/>
      </header>
      <div className ="container">
        <article className="article-container">
          <h2>{title}</h2>
          <p> from: {new Date(start).toLocaleString()}</p>
          <p>to: {new Date(end).toLocaleString()}</p>
        </article>
        <main className="comments-container">
          <CommentList id={props.id} />
        </main>
      </div>
    </section>
  );
}
