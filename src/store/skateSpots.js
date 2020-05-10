import { apiBaseUrl } from "../config";

const SET_SPOTS = "abc/skateSpots/SET_SPOTS";

export const setSpots = spots => {
  return {
    type: SET_SPOTS,
    spots
  };
};

export const setSkateSpots = () => async (dispatch, getState) => {
  try {
    const { authToken } = getState();
    const res = await fetch(`${apiBaseUrl}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });

    if (!res.ok) {
      throw res;
    }

    const { skateSpots } = await res.json();

    dispatch(setSpots(skateSpots));
  } catch (err) {
    console.error(err);
  }
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SPOTS":
      return {
        ...state,
        skateSpots: action.spots
      }
    default: return state;
  }
};
