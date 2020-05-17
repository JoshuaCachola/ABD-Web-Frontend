import api from "../utils";

const SET_SPOTS = "abd/skateSpots/SET_SPOTS";
const SET_SPOT = "abd/skateSpots/SET_SPOT";

export const setSpots = skateSpots => {
  return {
    type: SET_SPOTS,
    skateSpots
  };
};

export const setSpot= skateSpot => {
  return {
    type: SET_SPOT,
    skateSpot,
  };
};

export const setSkateSpots = () => async (dispatch, getState) => {
  try {
    const res = await fetch(`${api.url}/skatespots`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
      }
    });

    if (!res.ok) {
      throw res;
    }

    const { skateSpots } = await res.json();
    // console.log(skateSpots);
    dispatch(setSpots(skateSpots));
  } catch (err) {
    console.error(err);
  }
};

export const setSkateSpot = (skateSpot) => dispatch => {
  dispatch(setSpot(skateSpot));
};

export default function reducer(state = {skateSpots: [], skateSpot: {}}, action) {
  switch (action.type) {
    case SET_SPOTS: {
      return {
        ...state,
        skateSpots: action.skateSpots,
      };
    }
    case SET_SPOT: {
      return {
        ...state,
        skateSpot: action.skateSpot
      }
    }
    default:
      return state;
  }
};
