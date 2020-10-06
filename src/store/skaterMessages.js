// import api from "../utils";
// import socket from "../socket";

// // Actions
// const GET_CHAT_ROOM_MESSAGES = "abd/skaterMessages/GET_CHAT_ROOM_MESSAGES";
// const JOIN_ROOM = "abd/skaterMessages/JOIN_ROOM";

// // Action Creators
// export const getChatRoomMessages = (messages) => {
//   return {
//     type: GET_CHAT_ROOM_MESSAGES,
//     messages,
//   };
// };

// export const joinRoom = (room) => {
//   return {
//     type: JOIN_ROOM,
//     room,
//   };
// };

// // Thunks
// export const handleGetChatRoomMessages = (chatRoomName) => async (dispatch) => {
//   try {
//     let res = await fetch(
//       `${api.url}/api/v1/chatroom/messages/${chatRoomName}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
//         },
//       }
//     );

//     if (!res.ok) {
//       throw res;
//     }

//     res = await res.json();

//     dispatch(getChatRoomMessages(res));
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const handleJoinRoom = (room) => async (dispatch) => {
//   try {
//     let res = await fetch(`${api.url}/api/v1/chatroom`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
//       },
//       body: { room },
//     });

//     if (!res.ok) {
//       throw res;
//     }

//     dispatch(joinRoom({ message: `You have joined ${room}.` }));
//   } catch (err) {
//     dispatch(joinRoom({ message: `Error joining ${room}.` }));
//   }
// };

// export default function reducer(state = { messages: [] }, action) {
//   switch (action.type) {
//     case GET_CHAT_ROOM_MESSAGES: {
//       return {
//         ...state,
//         messages: action.messages,
//       };
//     }
//     default:
//       return state;
//   }
// }
