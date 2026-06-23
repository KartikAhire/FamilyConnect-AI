const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
cors:{
origin:"*",
methods:["GET","POST"]
}
});


// familyId -> members[]
const families={};


io.on(
"connection",
(socket)=>{

console.log(
"USER CONNECTED:",
socket.id
);


// =====================
// JOIN ROOM ONLY
// =====================

socket.on(
"join-room",
(familyId)=>{

socket.join(
familyId
);

console.log(
socket.id,
"JOINED:",
familyId
);

}
);


// =====================
// ADD MEMBER
// =====================

socket.on(
"join-family",
(data)=>{

const {
familyId,
member
}=data;


if(
!families[familyId]
){

families[familyId]=[];

}


const exists=

families[familyId]
.find(
m=>m.id===member.id
);


if(
!exists
){

families[familyId]
.push(
member
);

}


console.log(
"FAMILY:",
familyId
);

console.log(
"MEMBERS:",
families[familyId]
);


// sirf us room ko bhejo
io.to(
familyId
).emit(
"family-members",
families[familyId]
);

}
);


// =====================
// GET OLD MEMBERS
// =====================

socket.on(
"get-members",
(familyId)=>{

console.log(
"LOAD:",
familyId
);

socket.emit(
"family-members",
families[
familyId
]||[]
);

}
);


// =====================
// DISCONNECT
// =====================

socket.on(
"disconnect",
()=>{

console.log(
"USER LEFT:",
socket.id
);

});

}
);


server.listen(
5000,
()=>{

console.log(
"SERVER RUNNING 5000"
);

});