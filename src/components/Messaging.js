// import React, { useState, useEffect } from "react";
// import socket from "../socket";
// import * as yup from "yup";
// import { Form, Formik, Field } from "formik";
// import { TextField } from "formik-material-ui";
// import {
//   Container,
//   makeStyles,
//   Box,
//   Button,
//   Typography,
// } from "@material-ui/core";

// import Navbar from "./utils/Navbar";
// import { getChatRoomMessages } from "../requests";

// const useStyles = makeStyles((theme) => ({
//   chatContainer: {
//     maxWidth: 600,
//     width: "60%",
//     border: "1px solid #F8F8F8",
//     height: "500px",
//     margin: "100px auto",
//     borderRadius: "5px",
//     boxShadow: "0 0 12px rgba(0,0,0,0.2)",
//     display: "flex",
//     [theme.breakpoints.down("sm")]: {
//       width: "100%",
//     },
//   },
//   openChats: {
//     borderRight: "2px solid #ECECEC",
//   },
//   // directMessages: {
//   //   borderBottom: "1px solid #F8F8F8"
//   // }
//   // messageInput: {
//   //   position: "absolute",
//   //   bottom: 0
//   //
// }));

// const schema = yup.object({
//   message: yup.string().required("Message is required"),
// });

// const Messaging = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [initialized, setInitialized] = useState(false);
//   const [rooms, setRooms] = useState([]);

//   // useEffect(
//   //   () => {
//   //     getMessages();
//   //   },
//   //   // eslint-disable-next-line
//   //   [messages.length]
//   // );

//   const getMessages = async () => {
//     const res = await getChatRoomMessages("firstChat");
//     setMessages(res);
//     console.log(res);
//     setInitialized(true);
//   };

//   const getRooms = async () => {
//     // const res = await getChatRooms();
//     // setRooms(res.data);
//     // setInitialized(true);
//   };

//   const connectToRoom = () => {
//     // socket.on("connect", (data) => {
//     //   socket.emit("join", getChatData().chatRoomName);
//     // });

//     socket.on("newMessage", (data) => {
//       getMessages();
//     });

//     setInitialized(true);
//   };

//   const handleSubmitMessage = async (e) => {
//     const isValid = await schema.validate(e);
//     if (!isValid) {
//       return;
//     }
//     const data = { ...e };
//     // data.chatRoomName = getChatData().chatRoomName;
//     // data.author = getChatData().handle;
//     data.message = e.message;
//     data.chatRoomName = "firstChat";
//     data.author = "David";
//     console.log(data);
//     socket.emit("message", data);
//   };

//   const createChatForm = () => {
//     return (
//       <Formik initialValues={{ message: "" }} onSubmit={handleSubmitMessage}>
//         {({ submitForm, isSubmitting, handleChange, values }) => (
//           <Form>
//             <Field
//               component={TextField}
//               name="message"
//               type="text"
//               label="message"
//               onChangeText={handleChange("message")}
//               value={values.message}
//             />
//             <Button
//               color="primary"
//               disabled={isSubmitting}
//               onClick={submitForm}
//             >
//               Send
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     );
//   };

//   useEffect(() => {
//     if (!initialized) {
//       getMessages();
//       connectToRoom();
//       // getRooms();
//     }
//   });

//   const classes = useStyles();
//   return (
//     <>
//       <Navbar />
//       <Container className={classes.chatContainer}>
//         {/* List of direct and skate crew messages */}
//         <Box
//           display="flex"
//           flexDirection="column"
//           flexBasis="40%"
//           className={classes.openChats}
//         >
//           <Box display="flex" height="50%" mt={1} flexDirection="column">
//             <Typography style={{ fontWeight: "bold" }}>
//               Direct messages
//             </Typography>
//           </Box>
//           <Box display="flex" height="50%" flexDirection="column">
//             <Typography style={{ fontWeight: "bold" }}>
//               Group messages
//             </Typography>
//           </Box>
//         </Box>
//         {/* Chat messages from current selected chat room */}
//         <Box display="flex" flexBasis="60%">
//           <Box>
//             {messages &&
//               messages.map((m, i) => {
//                 return (
//                   <div key={i}>
//                     <p>{m.message}</p>
//                   </div>
//                 );
//               })}
//           </Box>
//           {/* Chat from */}
//           <Box
//             display="flex"
//             alignSelf="flex-end"
//             width="100%"
//             justifyContent="space-between"
//           >
//             {createChatForm()}
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default Messaging;
