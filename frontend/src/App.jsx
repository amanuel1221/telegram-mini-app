import {
Routes,
Route,
Navigate,
replace,
} from "react-router-dom";


import AppLayout from "./layouts/AppLayout";


import Home from "./pages/Home";
import Pdfs from "./pages/Pdfs";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PdfReader from "./pages/PdfReader";


export default function App(){

return (

<Routes>
<Route
 path="/login"
 element={<Login/>}
/>


<Route
path="/"
element={
<Navigate to="/home"
replace/>

}
/>
<Route
  path="/pdfs/:id"
  element={<PdfReader />}
/>

<Route
element={<AppLayout />}
>


<Route
path="/home"
element={<Home/>}
/>


<Route
path="/pdfs"
element={<Pdfs/>}
/>


<Route
path="/dashboard"
element={<Dashboard/>}
/>


<Route
path="/profile"
element={<Profile/>}
/>


</Route>


</Routes>

)

}