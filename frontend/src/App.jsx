import {
Routes,
Route,
Navigate,
} from "react-router-dom";


import AppLayout from "./layouts/AppLayout";


import Home from "./pages/Home";
import Pdfs from "./pages/Pdfs";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";


export default function App(){

return (

<Routes>


<Route
path="/"
element={
<Navigate to="/home"/>
}
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