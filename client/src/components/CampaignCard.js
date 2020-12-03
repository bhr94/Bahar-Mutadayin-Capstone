import { Progress } from "reactstrap";
import { Link } from "react-router-dom";

export default function CampaignCard({ data }) {
  return (
    <li className="card-container">
      <img className="card-container__img" src={data.img} />
      <article classNamae ="card-container__main">
        <h2 className = "card-container__main-title">{data.title}</h2>
        <p>
          {data.subtitle}
        </p>
        <p>{data.description}</p>
        <div className = "card-container__bottom">

          <div>
            <h3></h3>
            <p></p>
          </div>

          <div>
            <h3></h3>
            <p>days left</p>
          </div>

        </div>
        <Progress color="success" value="85" />
        <div className="card-container__buttons">
          <Link to={"/campaign" + data.id}>
            {" "}
            <button className="view-button">view</button>
          </Link>
          <button className="support-button">support</button>
        </div>
      </article>
    </li>
  );
}
