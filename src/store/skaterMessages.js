import api from "../utils";
import socket from "../socket";

// Actions
const PRIVATE_MESSAGE = "abd/skaterMessages/PRIVATE_MESSAGE";

// Action Creators
export const sendPrivateMessage = privateMsg => {
  return {
    type: PRIVATE_MESSAGE,
    privateMsg
  };
};

// Thunks
export const updatePrivateChat = message => async dispatch => {
  const userId = localStorage.getItem("TOKEN_KEY");
  try {
    const res = await fetch(`${api}`, {
      method: "POST",
      body: { message },
      header: {
        "Authorization": `Bearer ${userId}`,
        "Content-Type": "application/json"
      }
    });
    const { data } = await res.json();

    socket.emit("direct-msg", {
      text: data.text,
      userId,
      senderId: data.senderId
    })
  } catch (err) {
    console.error(err);
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case PRIVATE_MESSAGE: {
      return {
        ...state,
        privateMsg: action.privateMsg
      }
    }
    default: return state;
  }
};
