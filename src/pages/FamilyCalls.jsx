import { useEffect,useState } from "react";
import socket from "../services/socket";

function FamilyCalls(){

const [members,setMembers]=
useState([]);

useEffect(()=>{

// local backup load
const saved=

JSON.parse(
localStorage.getItem(
"familyMembers"
)
)||[];

setMembers(saved);


// socket connect hone ke baad
socket.on(
"connect",
()=>{

console.log(
"CONNECTED:",
socket.id
);

socket.emit(
"get-members"
);

}
);


// receive live members
socket.on(
"family-members",
(data)=>{

console.log(
"CALL MEMBERS FULL:",
JSON.stringify(data)
);

setMembers(data);

localStorage.setItem(
"familyMembers",
JSON.stringify(data)
);

});

return()=>{

socket.off("connect");

socket.off(
"family-members"
);

};

},[]);


return(

<div className="
min-h-screen
bg-gray-100
flex
justify-center
p-10
">

<div className="
w-[380px]
bg-white
rounded-[35px]
overflow-hidden
shadow-xl
">

<div className="
bg-gradient-to-r
from-purple-600
to-pink-500
p-6
text-white
">

<h1 className="
text-5xl
font-black
">

Family Calls

</h1>

<p>

{members.length} members

</p>

</div>


<div className="p-4">

{

members.map(
m=>(

<div
key={m.id}
className="
border
rounded-3xl
p-4
mb-4
flex
justify-between
items-center
"
>

<div className="flex gap-4">

<div className="
w-14
h-14
rounded-full
bg-purple-600
text-3xl
flex
items-center
justify-center
">

{m.avatar || "👨"}

</div>

<div>

<h2 className="
font-black
text-3xl
">

{m.name}

</h2>

<p>

🟢 Active

</p>

</div>

</div>

<button className="
w-14
h-14
rounded-full
bg-green-100
">

📞

</button>

</div>

))

}

</div>

</div>

</div>

);

}

export default FamilyCalls;