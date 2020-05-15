import api from "../utils";

// Action - Login User
const SET_TOKEN = "abd/authentication/SET_TOKEN";

// Action Creator - Login User
export const setToken = (authToken) => {
  return {
    type: SET_TOKEN,
    authToken
  };
};

// Thunk - Login user
export const login = (username, password) => async dispatch => {
  try {
    const res = await fetch(`${api.url}/skaters/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      throw res;
    }

    const { token } = await res.json();

    localStorage.setItem("TOKEN_KEY", token);

    dispatch(setToken(token));
  } catch (err) {
    console.error(err);
  }
};

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        authToken: action.authToken
      };
    }
    default: return state;
  }
};
