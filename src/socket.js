import io from "socket.io-client";
import api from "./utils";

const socket = io(`${api.url}`);
// const socket = io.connect("http://localhost:8008");

export default socket;
