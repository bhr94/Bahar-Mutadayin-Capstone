import Navigation from "../components/Navigation";
import CampaignCard from "../components/CampaignCard";
import CampaignCardList from "../components/CampaignCardList";
import Signin from "../Pages/Signin";
import Hero from "../components/Hero";
import {Link} from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <Link to ="/createCampaign">
        <button className="main-btn">Start Your Campaign</button>
      </Link>
      <CampaignCardList/>
    </>
  );
}
