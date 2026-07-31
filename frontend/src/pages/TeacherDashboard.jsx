import StatsCards from "../components/StatsCards";
import RecentPdfs from "../components/RecentPdfs";
import TeacherActions from "../components/TeacherActions";


export default function TeacherDashboard(){

return (

<div className="min-h-screen bg-slate-50 p-4">


<div className="mx-auto max-w-lg">


<h1 className="
mb-6
text-3xl
font-bold
">

Teacher Dashboard

</h1>


<StatsCards />


<RecentPdfs />
<TeacherActions />



</div>


</div>

);

}