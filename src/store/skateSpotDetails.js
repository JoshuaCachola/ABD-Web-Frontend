import { apiBaseUrl } from "../config";

const SET_SPOT_DETAILS = "abd/skateSpotDetails/SET_SPOT_DETAILS";

export const setSpotDetails = details => {
  return {
    type: SET_SPOT_DETAILS,
    details,
  };
};

export const getSpotDetails = (id) => async dispatch => {
  try {
    const res = await fetch(`${apiBaseUrl}/skatespots/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
      }
    });

    if (!res.ok) throw res;

    const { skateSpot } = await res.json();
    console.log(skateSpot);
    dispatch(setSpotDetails(skateSpot));
  } catch (err) {
    console.error(err);
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_SPOT_DETAILS: {
      return {
        ...state,
        details: action.details
      };
    }
    default: return state;
  }
};
