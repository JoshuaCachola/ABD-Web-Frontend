import React from "react";
import { connect } from "react-redux";
import { getSpotDetails, getSpotFeed } from "../../store/skateSpotDetails";

const SkateSpot = (props) => {
  return (
    <div className="skate-spot">
      <SkateSpotDetails details={props.spotDetails} />
      {/* <SkateSpotFeed posts={props.posts} /> */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    spotDetails: state.skateSpotDetails.spotDetails,
    spotFeed: state.skateSpotDetails.spotFeed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSpotDetail: () => dispatch(getSpotDetails()),
    getSpotFeed: () => dispatch(getSpotFeed())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  SkateSpot
);
