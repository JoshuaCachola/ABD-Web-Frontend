import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { setSkateSpots } from "../store/skateSpots";

const SkateSpots = (props) => {
  // useEffect(() => {
  //   props.getSkateSpots();
  // }, [props.skateSpots, props.skateSpots.length]);

  return (
    <div>
      <h1>SkateSpotsList</h1>
    </div>
  );
};

export default SkateSpots;
// const mapStateToProps = state => {
//   skateSpots: state.setSkateSpots.skateSpots
// };

// const mapDispatchToProps = dispatch => {
//   getSkateSpots: () => dispatch(setSkateSpots());
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   SkateSpots
// );
