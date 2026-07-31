import {
  useState,
} from "react";


import {
  Upload,
  FileText,
  LoaderCircle,
} from "lucide-react";


import {
  uploadPdf,
} from "../api/pdfApi";


import {
  useNavigate,
} from "react-router-dom";



export default function UploadPdf(){


const navigate = useNavigate();


const [title,setTitle] = useState("");

const [description,setDescription] = useState("");

const [file,setFile] = useState(null);

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");





const handleSubmit = async(e)=>{


e.preventDefault();


if(!file){

setError("Please select a PDF file");

return;

}



try{


setLoading(true);

setError("");



const formData = new FormData();


formData.append(
"file",
file
);


formData.append(
"title",
title
);


formData.append(
"description",
description
);



await uploadPdf(formData);



navigate("/teacher/pdfs");



}catch(error){


console.log(error);


setError(
error.response?.data?.message ||
"Upload failed"
);



}finally{


setLoading(false);


}



};





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

Upload PDF

</h1>




<form

onSubmit={handleSubmit}

className="
rounded-3xl
bg-white
p-6
shadow
space-y-5
"

>



<div className="
flex
items-center
justify-center
rounded-3xl
border-2
border-dashed
border-blue-300
p-8
"
>


<label
className="
cursor-pointer
text-center
"
>


<input

type="file"

accept="application/pdf"

hidden

onChange={(e)=>
setFile(
e.target.files[0]
)
}

/>


<div className="
mx-auto
mb-3
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-blue-100
text-blue-600
">

{
file ?

<FileText size={32}/>

:

<Upload size={32}/>

}

</div>



<p className="
font-semibold
text-slate-700
">

{
file
?
file.name
:
"Choose PDF file"
}

</p>


</label>



</div>





<input

value={title}

onChange={(e)=>
setTitle(e.target.value)
}

placeholder="PDF title"

className="
w-full
rounded-xl
border
p-3
outline-none
focus:border-blue-500
"

/>






<textarea

value={description}

onChange={(e)=>
setDescription(e.target.value)
}

placeholder="Description"

rows="4"

className="
w-full
rounded-xl
border
p-3
outline-none
focus:border-blue-500
"

/>






{
error && (

<p className="
rounded-xl
bg-red-50
p-3
text-sm
text-red-600
">

{error}

</p>

)

}






<button

disabled={loading}

className="
flex
w-full
items-center
justify-center
gap-3
rounded-xl
bg-blue-600
py-4
font-semibold
text-white
disabled:opacity-50
"

>


{
loading ?

<>

<LoaderCircle
className="animate-spin"
/>

Uploading...

</>

:

<>

<Upload/>

Upload PDF

</>

}



</button>



</form>


</div>


</div>

);


}