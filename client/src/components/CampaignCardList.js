import React from "react";
import CampaignCard from "./CampaignCard";
import axios from "axios";
const backendUrl = "http://localhost:8080";
class CampaignCardList extends React.Component {
  state = {
    campaingList: [],
  };

  componentDidMount() {
    this.getAllCampaigns();
  }

  getAllCampaigns = () => {
    axios
      .get(backendUrl)
      .then((response) => {
        this.setState({ campaingList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const campaignList = this.state.campaingList.map((item) => {
      return <CampaignCard data={item.data} />;
    });
    return (
      <ul>
        {this.state.campaingList.length > 0 ? campaignList : <h2>Loading</h2>}
      </ul>
    );
  }
}

export default CampaignCardList;
