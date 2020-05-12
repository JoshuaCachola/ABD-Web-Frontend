import React from "react";
import { connect } from "react-redux";
import { getSpotDetails } from "../../store/skateSpotDetails";

const SkateSpot = (props) => {
  
};  

const mapStateToProps = state => {
  return {
    spotDetails: state.spotSkateDetails.spotDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSpotDetail: () => dispatch(getSpotDetails())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  SkateSpot
);