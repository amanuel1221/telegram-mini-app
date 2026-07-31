import {
 User,
 ShieldCheck,
 Hash,
 Users,
 LogOut,
 BookOpen,
 FileText,
} from "lucide-react";


import useAuth from "../hooks/useAuth";


export default function StudentDashboard(){


const {
 user,
 logout,
}=useAuth();



return (

<div className="
min-h-screen
bg-slate-50
px-4
py-6
">


<div className="
mx-auto
max-w-lg
">


<div className="
rounded-3xl
bg-gradient-to-br
from-blue-600
to-indigo-600
p-6
text-white
shadow-xl
">


<p className="text-sm opacity-80">
Telegram LMS
</p>


<h1 className="
mt-2
text-3xl
font-bold
">

Welcome,
<br/>

{user?.firstName}

</h1>



<div className="mt-5 flex gap-3">


<span className="
rounded-full
bg-white/20
px-4
py-2
text-sm
">

Student

</span>


<span className={`
rounded-full
px-4
py-2
text-sm
${user?.isMember
?
"bg-green-400/30"
:
"bg-red-400/30"
}
`}>

{
user?.isMember
?
"Member"
:
"Not Joined"
}

</span>



</div>


</div>





<div className="
mt-6
rounded-3xl
bg-white
p-6
shadow
">


<h2 className="
mb-5
font-bold
text-lg
">

Profile

</h2>



<div className="space-y-5">


<InfoItem
icon={<User/>}
title="Username"
value={
user?.username
?
`@${user.username}`
:
"N/A"
}
/>


<InfoItem
icon={<ShieldCheck/>}
title="Role"
value="Student"
/>


<InfoItem
icon={<Hash/>}
title="Telegram ID"
value={user?.telegramId}
/>


<InfoItem
icon={<Users/>}
title="Group"
value={
user?.isMember
?
"Active Member"
:
"Not Joined"
}
/>



</div>


</div>





<div className="
mt-6
grid
grid-cols-2
gap-4
">


<StudentButton
icon={<BookOpen/>}
title="Browse PDFs"
/>



<StudentButton
icon={<FileText/>}
title="My Courses"
/>



</div>




<button

onClick={logout}

className="
mt-8
flex
w-full
items-center
justify-center
gap-3
rounded-2xl
bg-red-500
py-4
font-semibold
text-white
"

>

<LogOut/>

Logout


</button>



</div>


</div>

);


}




function InfoItem({
icon,
title,
value
}){


return (

<div className="
flex
items-center
gap-4
">

<div className="
rounded-2xl
bg-blue-100
p-3
text-blue-600
">

{icon}

</div>


<div>

<p className="
text-sm
text-slate-500
">

{title}

</p>


<p className="
font-semibold
">

{value || "N/A"}

</p>


</div>


</div>

);


}





function StudentButton({
icon,
title
}){


return (

<button
className="
rounded-3xl
bg-white
p-5
shadow
flex
flex-col
items-center
gap-3
"
>

<div className="
rounded-2xl
bg-blue-100
p-3
text-blue-600
">

{icon}

</div>


<span className="
font-semibold
text-sm
">

{title}

</span>


</button>

);


}