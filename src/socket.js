import io from "socket.io-client";
import api from "./utils";

const socket = io(`${api.url}`);

export default socket;
