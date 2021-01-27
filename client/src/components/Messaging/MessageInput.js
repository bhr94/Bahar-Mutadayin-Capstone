import React, { useState, useEffect } from "react";

export default function MessageInput(props) {
  // useEffect(() => {
  //   document.getElementsByClassName(".message__form--input").focus();
  // });
  const [message, setMessage] = useState("");
  function handleChange(e) {
    setMessage(e.target.value);
  }
  return (
    <div className="message__form">
      <input
      id = "input"
        type="text"
        placeholder="Enter a message..."
        className="message__form--input"
        value={message}
        onChange={handleChange}
      />
      <button
        className="message__form--submit"
        onClick={() => props.sendMessage(message)}
      >
        enter
      </button>
    </div>
  );
}
