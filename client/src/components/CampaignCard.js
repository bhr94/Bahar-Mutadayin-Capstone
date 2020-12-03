import { Progress } from "reactstrap";
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';




// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function CampaignCard() {
  return (
    <div className="card-container">
      <img className = "card-container__img"
      src="https://lh3.googleusercontent.com/proxy/EFbz0IAnGU-57WQLCOOCBlbIcvmQ529OgoWl0p8FxpYoOY91jH2YXiTimBN7GlMjaBPIuFltBdEAScTMLr0HpwQ4X-sCMl2-shf8gxO0mJ4oMXqb2l4TiMkKFzu76jEtIF4ewPpgasDjTjP-pPJiwCo5Q2w" />
      <article>
        <h2>Card title</h2>
        <p tag="h6" className="mb-2 text-muted">
          Card subtitle
        </p>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Progress color="success" value="85" />
        <div className="card-container__buttons">
          <button className="view-button">view</button>
          <button className="support-button">support</button>
        </div>
      </article>
     
    </div>
  );
}
