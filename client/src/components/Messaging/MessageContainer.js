import MessageInput from "./MessageInput";
import { Scrollbars } from "rc-scrollbars";
import closeIcon from "../../assets/Icons/close.svg";
import MessageElement from "./MessageElement";
export default function MessageContainer() {
  return (
    <section className="message-container">
      <div className="message-container__header">
        <p className="message-container__header--text">User Name</p>
        <img
          alt="close icon for message"
          src={closeIcon}
          className="message-container__header--icon"
        />
      </div>
      <ul style={{ height: "300px" }} className="message-container__main">
        <MessageElement />
      </ul>
      <MessageInput />
    </section>
  );
}
