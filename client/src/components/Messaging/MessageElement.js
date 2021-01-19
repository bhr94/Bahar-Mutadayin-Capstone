import profile from "../../assets/Icons/profile.svg";
export default function MessageElement({ message }) {
  return (
    <li className="message-item__container">
      <img
        alt="user avatar"
        className="message-item__container--img"
        src={profile}
      />
      <p className="message-item__container--text">
        {message} iushdifusdkjfnskdjnfksndfkjnskdjfnkjsndkfjnskdjnf
        kdsfnksjdnfkjsndkjfnskjndshiudfhslkdfnlskmdflksmdflkmslkdmflksmdflkmslkdf\
        ksjdnfkjsndfkjnsdf ldkfmlskdmflkmsf sdfsldkmfisuhdf
      </p>
    </li>
  );
}
