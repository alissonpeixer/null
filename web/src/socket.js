import { io } from "socket.io-client";

const URL = "http://localhost:9901";


const socket = io(URL);






export default socket;