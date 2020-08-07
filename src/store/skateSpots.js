import api from "../utils";

const SET_SPOTS = "abd/skateSpots/SET_SPOTS";
const SET_SPOT = "abd/skateSpots/SET_SPOT";
const CURRENT_SKATE_SPOT = "abd/skateSpots/CURRENT_SKATE_SPOT";
const FOLLOWED_SKATE_SPOTS = "abd/skateSpots/FOLLOWED_SKATE_SPOTS";

export const setSpots = (skateSpots) => {
  return {
    type: SET_SPOTS,
    skateSpots,
  };
};

export const setSpot = (skateSpot) => {
  return {
    type: SET_SPOT,
    skateSpot,
  };
};

export const followSpot = (followedSkateSpots) => {
  return {
    type: FOLLOWED_SKATE_SPOTS,
    followedSkateSpots,
  };
};

export const currentSkateSpot = (currentSkateSpot) => {
  return {
    type: CURRENT_SKATE_SPOT,
    currentSkateSpot,
  };
};
export const setSkateSpots = () => async (dispatch, getState) => {
  try {
    const res = await fetch(`${api.url}/skatespots`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
      },
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

export const setSkateSpot = (skateSpot) => (dispatch) => {
  // localStorage.setItem("CURRENT_SKATE_SPOT", skateSpot);
  dispatch(setSpot(skateSpot));
};

export const setFollowedSkateSpots = (skateSpots) => (dispatch) => {
  dispatch(followSpot(skateSpots));
};

export const setCurrentSkateSpot = (skateSpot) => (dispatch) => {
  localStorage.setItem("CURRENT_SKATE_SPOT", JSON.stringify(skateSpot));
  dispatch(currentSkateSpot(skateSpot));
};

export default function reducer(
  state = { skateSpots: [], skateSpot: {}, currentSkateSpot: {}, followedSkateSpots: [] },
  action
) {
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
        skateSpot: action.skateSpot,
      };
    }
    case CURRENT_SKATE_SPOT: {
      return {
        ...state,
        currentSkateSpot: action.currentSkateSpot,
      };
    }
    case FOLLOWED_SKATE_SPOTS: {
      return {
        ...state,
        followedSkateSpots: action.followedSkateSpots
      }
    }
    default: return state;
  }
}
