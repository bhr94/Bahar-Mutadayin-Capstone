import React from "react";
import CommentList from "./CommentList";
export default function Event(props) {
  const { title, end, start } = props.event;
  return (
    <section className="profile-container scrollable">
      <header className="profile-container__header"></header>
      <article className="article-container">
        <h2>{title}</h2>
        <p> from: {new Date(start).toLocaleString()}</p>
        <p>to: {new Date(end).toLocaleString()}</p>
      </article>
      <main className="comments-container">
        <CommentList id={props.id} className="comments-container" />
      </main>
    </section>
  );
}
