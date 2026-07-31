import useAuth from "../hooks/useAuth";

import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

import {
  LoaderCircle,
} from "lucide-react";


export default function Dashboard(){

  const {
    user,
    loading,
  } = useAuth();



  if(loading){

    return (

      <div className="
      flex
      min-h-screen
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




  if(!user){

    return (

      <div className="
      flex
      min-h-screen
      items-center
      justify-center
      ">

        <p>
          Not authenticated
        </p>

      </div>

    );

  }




  return (

    user.role === "teacher"

      ?

      <TeacherDashboard />

      :

      <StudentDashboard />

  );


}