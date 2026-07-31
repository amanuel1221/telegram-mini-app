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
import ProtectedRoute from "./routes/ProtectedRoute";
import TeacherDashboard from "./pages/TeacherDashboard"
import MyPdfs from "./components/MyPdfs";
import UploadPdf from "./components/UploadPdf";


export default function App() {

  return (

    <Routes>
      <Route
        path="/login"
        element={<Login />} />


      <Route
        path="/"
        element={
          <Navigate to="/home"
            replace />

        }
      />
      <Route
        path="/pdfs/:id"
        element={<PdfReader />} />

      <Route
        element={<AppLayout />}
      >


        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/teacher/dashboard"
          element={<TeacherDashboard />}
        />

       


        <Route
          path="/pdfs"
          element={<Pdfs />}
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/teacher/pdfs"
          element={<MyPdfs />}
        />
        <Route
          path="/teacher/upload"
          element={<UploadPdf />}
        />


      </Route>


    </Routes>

  )

}