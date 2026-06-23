import {useState,useEffect} from "react";
import {Mic,Volume2,PhoneOff,Sparkles} from "lucide-react";

function VoiceCall(){

const [seconds,setSeconds]=useState(0);

useEffect(()=>{

const t=setInterval(()=>{

setSeconds(p=>p+1);

},1000);

return()=>clearInterval(t);

},[]);

function format(sec){

const m=Math.floor(sec/60);

const s=sec%60;

return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

}

return(

<div className="
min-h-screen
bg-gradient-to-br
from-black
via-purple-950
to-black
flex
items-center
justify-center
">

<div className="
w-[390px]
h-[844px]
relative
overflow-hidden
rounded-[35px]
bg-gradient-to-b
from-purple-900
to-black
text-white
">

<div className="
absolute
top-8
left-0
right-0
px-6
flex
justify-between
items-center
">

<div className="
flex
items-center
gap-2
font-bold
text-lg
">

<div className="
w-9
h-9
rounded-full
bg-purple-500/20
flex
items-center
justify-center
">

📡

</div>

<span>

Secure Family Voice

</span>

</div>


<div className="
bg-green-500/15
border
border-green-400/20
text-green-300
px-3
py-2
rounded-full
text-xs
backdrop-blur-xl
shadow-lg
shadow-green-500/10
">

🟢 HD Voice

</div>

</div>
<div className="
mt-48
flex
flex-col
items-center
">

<div className="relative flex items-center justify-center">

<div className="
absolute
w-44
h-44
rounded-full
border
border-pink-500
animate-ping
opacity-20
blur-sm
"/>



<div className="
absolute
w-52
h-52
rounded-full
border
border-purple-500
animate-pulse
opacity-20
blur-sm
"/>

<div className="
w-40
h-40
rounded-full
bg-gradient-to-r
from-pink-500
to-purple-600

shadow-2xl
shadow-pink-500/40
flex
items-center
justify-center
text-7xl
relative
z-20
">

👨

</div>

</div>

<h1 className="
text-5xl
font-black
mt-8
">

monya

</h1>

<p className="text-green-400 mt-3">

🟢 Secure connection established

</p>

<p className="text-white/60">

AI optimizing voice quality...

</p>

<div className="
mt-4
px-4
py-2
rounded-full
bg-white/10
backdrop-blur
text-white
font-bold
">

⏱ {format(seconds)}

</div>

<div className="
flex
gap-3
mt-6
items-end
">

<div className="w-3 h-14 bg-pink-500 animate-pulse rounded-full"/>

<div className="w-3 h-20 bg-purple-500 animate-bounce rounded-full"/>

<div className="w-3 h-10 bg-pink-500 animate-pulse rounded-full"/>

<div className="w-3 h-16 bg-purple-500 animate-bounce rounded-full"/>

<div className="w-3 h-14 bg-pink-500 animate-pulse rounded-full"/>

</div>

<p className="
mt-5
text-green-400
mb-3
">

AI Noise Cancel ON

</p>

<p className="
text-xs
text-cyan-300
mt-2
mb-8
">

✨ Family Bond Score: 98%

</p>

</div>

<div className="
absolute
bottom-6
left-1/2
-translate-x-1/2
bg-black/30
border
border-white/10
backdrop-blur-xl
rounded-full
px-5
py-4
flex
gap-6
">

<button className="
w-16
h-16
rounded-full
bg-white/10
flex
items-center
justify-center
hover:scale-110
transition
duration-300
">

<Mic size={28}/>

</button>


<button className="
w-16
h-16
rounded-full
bg-white/10
flex
items-center
justify-center
hover:scale-110
transition
duration-300
">

<Volume2 size={28}/>

</button>


<button className="
w-16
h-16
rounded-full
bg-white/10
flex
items-center
justify-center
hover:scale-110
transition
duration-300
">

<Sparkles size={28}/>

</button>


<button className="
w-20
h-20
rounded-full
bg-gradient-to-r
from-red-500
to-pink-500
shadow-2xl
shadow-red-500/50
flex
items-center
justify-center
hover:scale-110
transition
duration-300
">

<PhoneOff size={34}/>

</button>

</div>

</div>

</div>

)

}

export default VoiceCall;