import { io } from "socket.io-client";

const socket = io(
"http://localhost:5000",
{
transports:["websocket"],
autoConnect:true,
reconnection:false
}
);

socket.on(
"connect",
()=>{

console.log(
"SOCKET CONNECTED:",
socket.id
);

}
);

export default socket;