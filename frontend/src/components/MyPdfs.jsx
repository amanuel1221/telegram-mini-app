import {
  useEffect,
  useState,
} from "react";


import {
  FileText,
  Trash2,
  Edit,
  Eye,
  LoaderCircle,
} from "lucide-react";


import {
  getMyPdfs,
  deletePdf,
} from "../api/pdfApi";


import {
  useNavigate,
} from "react-router-dom";



export default function MyPdfs(){


const [pdfs,setPdfs]=useState([]);

const [loading,setLoading]=useState(true);

const navigate = useNavigate();



const loadPdfs = async()=>{


try{


const data = await getMyPdfs();


setPdfs(data.pdfs || []);



}catch(error){

console.log(error);


}finally{

setLoading(false);

}


};



useEffect(()=>{

loadPdfs();

},[]);





const handleDelete = async(id)=>{


const confirmDelete =
window.confirm(
"Delete this PDF?"
);


if(!confirmDelete)
return;



try{


await deletePdf(id);


setPdfs(
pdfs.filter(
(pdf)=>pdf._id !== id
)
);



}catch(error){

console.log(error);

}


};




if(loading){

return (

<div className="
flex
h-screen
items-center
justify-center
">

<LoaderCircle
className="animate-spin text-blue-600"
size={40}
/>

</div>

);

}





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


<h1 className="
mb-6
text-3xl
font-bold
text-slate-800
">

My PDFs

</h1>




{
pdfs.length === 0 ? (

<div className="
rounded-3xl
bg-white
p-8
text-center
shadow
">


<FileText
className="
mx-auto
mb-3
text-slate-400
"
/>


<p className="
text-slate-500
">

No PDFs uploaded

</p>


</div>


)

:

(

<div className="
space-y-4
">


{
pdfs.map((pdf)=>(


<div
key={pdf._id}
className="
rounded-3xl
bg-white
p-5
shadow
"
>



<div className="
flex
items-center
gap-3
">


<div className="
rounded-2xl
bg-blue-100
p-3
text-blue-600
">

<FileText/>

</div>


<div>

<h2 className="
font-bold
text-slate-800
">

{pdf.title}

</h2>


<p className="
text-sm
text-slate-500
">

{pdf.description ||
"No description"}

</p>


</div>


</div>





<div className="
mt-5
grid
grid-cols-3
gap-3
">



<button

onClick={()=>navigate(
`/pdf/${pdf._id}`
)}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-blue-600
py-3
text-sm
font-semibold
text-white
"

>

<Eye size={16}/>

View

</button>





<button

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-yellow-100
py-3
text-sm
font-semibold
text-yellow-700
"

>

<Edit size={16}/>

Edit

</button>





<button

onClick={()=>
handleDelete(pdf._id)
}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-red-100
py-3
text-sm
font-semibold
text-red-600
"

>

<Trash2 size={16}/>

Delete

</button>



</div>



</div>


))


}


</div>


)


}



</div>


</div>

);


}