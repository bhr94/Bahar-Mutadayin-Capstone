import React, { useState, useEffect } from "react";
import MessageInput from "./MessageInput";
import closeIcon from "../../assets/Icons/close.svg";
import MessageElement from "./MessageElement";
export default function MessageContainer() {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(!open);
  }
  useEffect(() => {
    let messages = document.querySelector(".message-container__main");
    messages.scrollTop = messages.scrollHeight;
  });

  return (
    <section className="message-container">
      <div className="message-container__header">
        <p className="message-container__header--text">User Name</p>
        <img
          alt="close icon for message"
          src={closeIcon}
          className="message-container__header--icon"
          onClick={handleClose}
        />
      </div>
      <ul className="message-container__main">
        <MessageElement />
        <MessageElement />
      </ul>
      <MessageInput />
    </section>
  );
}
