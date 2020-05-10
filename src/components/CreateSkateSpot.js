import React, { useState } from "react";
import { connect } from "react-redux";

const CreateSkateSpot = () => {
  const [spotName, setSpotName] = useState("");
  const [spotAddress, setSpotAddress] = useState("");

  handleSpotName = e => setSpotName(e.target.value);
  handleSpotAddress = e => setSpotAddress(e.target.value);
  handleSubmit = e => {
    e.preventDefault();

  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="input"
        name={spotName}
        onChange={handleSpotName}
        placeholder="Name of spot"
      />
      <input
        type="input"
        name={spotAddress}
        onChange={handleSpotAddress}
        placeholder="Address of spot"
      />
      <button type="submit">Share Spot</button>
    </form>
  );
};

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  CreateSkateSpot
);
