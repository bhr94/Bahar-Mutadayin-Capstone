import React from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
const backendUrl = "http://localhost:8080/";

class CampaignDetails extends React.Component {
  state = {
    campaignDetails: {},
  };

  componentDidMount() {
    this.getCampaignDetails();
  }

  getCampaignDetails = () => {
    axios
      .get(backendUrl + this.props.match.params.id)
      .then((response) => {
        this.setState({ campaignDetails: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <section>
        <Navigation />
        <h2>{this.state.campaignDetails.title}</h2>
        <section></section>
      </section>
    );
  }
}

export default CampaignDetails;
