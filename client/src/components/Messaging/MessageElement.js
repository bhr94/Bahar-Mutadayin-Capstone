export default function MessageElement({ message }) {
  return (
    <li className="message-item__container">
      <img alt="user avatar" className="message-item__container--img" />
      <p className="message-item__container--text">{message}</p>
    </li>
  );
}
