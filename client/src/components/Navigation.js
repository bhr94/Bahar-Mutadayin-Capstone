import logo from "../assets/logo/default.svg";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <nav className="navigation">
      {/* <img src={logo}  className = ""/> */}
      <h2>LOGO</h2>
      <a className="navigation__toggle">
        <span className="navigation__toggle--bar"></span>
        <span className="navigation__toggle--bar"></span>
        <span className="navigation__toggle--bar"></span>
      </a>
      <ul className="navigation__list">
        <Link className="navigation__list--item" to = "/">Home</Link>
        <Link className="navigation__list--item" tp = "/startCampaign">
          Start Your Campaign
        </Link>
        <Link className="navigation__list--item" to = "/signin">Login or Sign Up</Link>
      </ul>
    </nav>
  );
}
