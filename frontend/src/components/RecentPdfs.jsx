import {
  FileText,
  Calendar,
  User,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../api/teacherApi";


export default function RecentPdfs(){

const [pdfs,setPdfs]=useState([]);


useEffect(()=>{

const loadPdfs = async()=>{

try{

const data = await getDashboardStats();

setPdfs(data.recentPdfs || []);

}catch(error){

console.log(error);

}

};


loadPdfs();

},[]);



return (

<div className="
mt-6
rounded-3xl
bg-white
p-6
shadow
">

<h2 className="
mb-5
text-lg
font-bold
text-slate-800
">

Recent Uploads

</h2>


{
pdfs.length === 0 ? (

<p className="
text-sm
text-slate-500
">

No PDFs uploaded yet

</p>

)

:

(

<div className="space-y-4">


{
pdfs.map((pdf)=>(

<div
key={pdf._id}
className="
flex
items-center
justify-between
rounded-2xl
bg-slate-50
p-4
"
>


<div className="
flex
items-center
gap-3
">


<div className="
rounded-xl
bg-blue-100
p-3
text-blue-600
">

<FileText size={22}/>

</div>


<div>

<h3 className="
font-semibold
text-slate-800
">

{pdf.title}

</h3>


<div className="
mt-1
flex
items-center
gap-3
text-xs
text-slate-500
">


<span className="
flex
items-center
gap-1
">

<User size={14}/>

{
pdf.uploadedBy?.firstName ||
"Unknown"
}

</span>


<span className="
flex
items-center
gap-1
">

<Calendar size={14}/>

{
new Date(
pdf.createdAt
).toLocaleDateString()
}

</span>


</div>


</div>


</div>


<button

className="
rounded-xl
bg-blue-600
px-4
py-2
text-sm
font-semibold
text-white
"

>

View

</button>


</div>


))

}


</div>

)

}


</div>

);


}