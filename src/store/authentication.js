// Action - Login User
const SET_TOKEN = "abd/authentication/SET_TOKEN";
const REMOVE_TOKEN = "abd/authentication/REMOVE_TOKEN";

// Action Creator - Login User
export const setToken = (authToken) => {
  return {
    type: SET_TOKEN,
    authToken,
  };
};

export const removeToken = () => (dispatch) => {
  dispatch(setToken(""));
};

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case REMOVE_TOKEN:
    case SET_TOKEN: {
      return {
        ...state,
        authToken: action.authToken,
      };
    }
    default:
      return state;
  }
}
