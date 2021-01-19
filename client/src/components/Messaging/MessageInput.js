export default function MessageInput() {
  return (
    <form className ="message__form">
      <input type="text" placeholder="Enter a message..." className ="message__form--input"/>
      <input type="submit" className ="message__form--submit"/>
    </form>
  );
}
