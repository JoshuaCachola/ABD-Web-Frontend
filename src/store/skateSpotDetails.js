import { apiBaseUrl } from "../config";

const SET_SPOT_DETAILS = "abd/skateSpotDetails/SET_SPOT_DETAILS";

export const setSpotDetails = details => {
  return {
    type: SET_SPOT_DETAILS,
    details,
  };
};

export const getSpotDetails = () => async dispatch =>{
  try {

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