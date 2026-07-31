import {
  Upload,
  FileText,
  Users,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


export default function TeacherActions(){

  const navigate = useNavigate();


  const actions = [

    {
      title: "Upload PDF",
      description: "Add new course material",
      icon: <Upload size={24}/>,
      path: "/teacher/upload",
    },


    {
      title: "My PDFs",
      description: "Manage your files",
      icon: <FileText size={24}/>,
      path: "/teacher/pdfs",
    },


    {
      title: "Students",
      description: "View LMS members",
      icon: <Users size={24}/>,
      path: "/teacher/students",
    },


    {
      title: "Settings",
      description: "Teacher settings",
      icon: <Settings size={24}/>,
      path: "/teacher/settings",
    },

  ];



  return (

    <div className="mt-6">


      <h2 className="
      mb-4
      text-lg
      font-bold
      text-slate-800
      ">
        Quick Actions
      </h2>



      <div className="
      grid
      grid-cols-2
      gap-4
      ">


      {
        actions.map((action)=>(


          <button

          key={action.title}

          onClick={()=>navigate(action.path)}

          className="
          rounded-3xl
          bg-white
          p-5
          text-left
          shadow-md
          transition
          hover:-translate-y-1
          hover:shadow-lg
          active:scale-95
          "

          >


            <div className="
            mb-4
            inline-flex
            rounded-2xl
            bg-blue-100
            p-3
            text-blue-600
            ">

              {action.icon}

            </div>



            <h3 className="
            font-bold
            text-slate-800
            ">

              {action.title}

            </h3>



            <p className="
            mt-1
            text-xs
            text-slate-500
            ">

              {action.description}

            </p>



          </button>


        ))
      }


      </div>


    </div>

  );

}