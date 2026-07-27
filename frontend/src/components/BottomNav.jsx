import {
  Home,
  BookOpen,
  LayoutDashboard,
  User,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";


const navItems = [
  {
    name:"Home",
    path:"/home",
    icon:Home,
  },
  {
    name:"PDFs",
    path:"/pdfs",
    icon:BookOpen,
  },
  {
    name:"Dashboard",
    path:"/dashboard",
    icon:LayoutDashboard,
  },
  {
    name:"Profile",
    path:"/profile",
    icon:User,
  },
];


export default function BottomNav(){

return (

<nav
className="
fixed
bottom-0
left-0
right-0
z-50
border-t
bg-white
shadow-lg
"
>

<div
className="
mx-auto
flex
max-w-lg
justify-around
py-3
"
>


{
navItems.map((item)=>{

const Icon=item.icon;


return (

<NavLink
key={item.path}
to={item.path}
className={({isActive})=>

`
flex
flex-col
items-center
gap-1
text-xs
transition

${
isActive
?
"text-blue-600"
:
"text-slate-400"
}

`
}
>

<Icon size={22}/>

<span>
{item.name}
</span>


</NavLink>

)

})
}


</div>


</nav>

)

}