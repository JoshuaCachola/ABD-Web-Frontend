import { apiBaseUrl } from "../config";

const SET_SPOTS = "abd/skateSpots/SET_SPOTS";
// const ADD_SKATE_SPOT = "abd/skateSpots/ADD_SKATE_SPOT";

export const setSpots = skateSpots => {
  return {
    type: SET_SPOTS,
    skateSpots
  };
};

// export const addSkateSpot = skateSpot => {
//   return {
//     type: ADD_SKATE_SPOT,
//     skateSpot,
//   };
// };

export const setSkateSpots = () => async (dispatch, getState) => {
  try {
    const res = await fetch(`${apiBaseUrl}/skatespots`, {
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

// export const addSpot = (name, city, state, address) => async (dispatch) => {
//   try {
//     const res = await fetch(`${apiBaseUrl}/skatespots`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
//       },
//       body: JSON.stringify({
//         name,
//         city,
//         state,
//         address,
//       }),
//     });

//     if (!res.ok) {
//       throw res;
//     }

//     dispatch(setSpots());
//   } catch (err) {
//     console.error(err);
//   }
// };

export default function reducer(state = {skateSpots: []}, action) {
  switch (action.type) {
    case SET_SPOTS: {
      return {
        ...state,
        skateSpots: action.skateSpots,
      };
    }
    default:
      return state;
  }
};
