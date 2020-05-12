import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setSkateSpots } from "../store/skateSpots";

const SkateSpots = (props) => {
  const history = useHistory()
  
  useEffect(() => {
    if (!props.skateSpots.length) {
      props.getSkateSpots();
    }
    console.log(props);
  }, [props.skateSpots, props, props.skateSpots.length]);

  const addNewSpot = () => {
    history.push("/skatespots/create-spot");
    // return <Redirect to="/skatespots/create-spot" />;
  };
  
  return (
    <div>
      <h1>Skate Spots List</h1>
      <button
      onClick={addNewSpot}>
        Add spot
      </button>
      <div>
        {props.skateSpots.map((skateSpot, i) => (
        <div key={i}>
          <div>{skateSpot.name}</div>
          <div>{skateSpot.city}</div>
          <div>{skateSpot.state}</div>
          <img src={skateSpot.imgs[0]} alt="skate-img"/>
        </div>
        ))}
      </div>
    </div>
  );
};

// export default SkateSpots;
const mapStateToProps = state => {
  return {
    skateSpots: state.skateSpotFeed.skateSpots,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSkateSpots: () => dispatch(setSkateSpots())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  SkateSpots
);
