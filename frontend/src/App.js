import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appointment from './pages/Appointment'
import AdminLogin from './pages/AdminLogin'
import About from './pages/About'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DoctorLogin from "./pages/DoctorLogin";
import ReceptionistLogin from "./pages/ReceptionistLogin";
import Footer from "./components/Footer";
import AdminPage from "./admin dashboard/admin/AdminPage";
import {doctorColumns, patientColumns, receptionistColumns} from './dataTableSource'
import DoctorPage from "./admin dashboard/Doctor/DoctorPage";
import ReceptionistPage from "./admin dashboard/receptionist/ReceptionistPage";
import PatientPage from "./admin dashboard/patient/PatientPage";
import AddDoctorPage from "./admin dashboard/Doctor/AddDoctorPage";
import AddReceptionistPage from "./admin dashboard/receptionist/AddReceptionistPage";
import MessagePage from "./admin dashboard/admin/MessagePage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import ViewDoctor from "./admin dashboard/Doctor/ViewDoctor";
import Viewreceptionist from "./admin dashboard/receptionist/Viewreceptionist";
import ViewPatient from "./admin dashboard/patient/ViewPatient";
import EditDoctorPage from "./admin dashboard/Doctor/EditDoctorPage";
import EditReceptionist from "./admin dashboard/receptionist/EditReceptionist";
import EditPatient from "./admin dashboard/patient/EditPatient";
import Prescription from "./components/Prescription";
//import DoctorMain from "./DoctorDashboard/doctor/DoctorMain";
//import ReceptionistMain from "./receptionist dashboard/ReceptionistMain";

function App() {
  const ProtectedRouteAdmin = ({ children }) => {
    const { user } = useContext(AuthContext)
   //console.log(user.role)
    if (!user || user.role !== "admin") {
      return <Navigate to='/' />
    }
    return children;
  }
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
   
    if (!user || user.role !== "doctor") {
      return <Navigate to='/' />
    }
    return children;
  }
  const ProtectedRouteRecep = ({ children }) => {
    const { user } = useContext(AuthContext)
   
    if (!user || user.role !== "receptionist") {
      return <Navigate to='/' />
    }
    return children;
  }

  const ProtectedRouteAll = ({ children }) => {
    const { user } = useContext(AuthContext)
   
    if (!user || (user.role !== 'doctor' && user.role !== 'receptionist' && user.role !== 'admin')) {
      return <Navigate to='/' />;
    }
    return children;
  }
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<><Navbar /> <Home />   <Footer /></>} />
          <Route path="/appointment" element={<><Navbar /><Appointment /> <Footer /></>} />

          <Route path="/login/admin" element={<><Navbar /><AdminLogin /><Footer /></>} />
          <Route path="/login/doctor" element={<><Navbar /><DoctorLogin /><Footer /></>} />
          <Route path="/login/receptionist" element={<><Navbar /><ReceptionistLogin /><Footer /></>} />

          <Route path="/about" element={<><Navbar /><About /> <Footer /></>} />

          <Route path="/prescription" element={<><ProtectedRouteAll><Prescription /></ProtectedRouteAll> </>} />

          <Route path="/admin/dashboard" element={<><ProtectedRouteAdmin ><AdminPage type="admin" /></ProtectedRouteAdmin></>} />
          <Route path="/doctor/dashboard" element={<><ProtectedRoute ><AdminPage type="doctor"/></ProtectedRoute></>} />
          <Route path="/recep/dashboard" element={<><ProtectedRouteRecep ><AdminPage type="recep"/></ProtectedRouteRecep></>} />

          <Route path="/doctor" element={<><ProtectedRouteAdmin ><DoctorPage columns={doctorColumns} /></ProtectedRouteAdmin></>} />
          <Route path="/doctor/:doctorId" element={<><ProtectedRouteAdmin><ViewDoctor/></ProtectedRouteAdmin></>} />
          <Route path="/doctor/edit/:_id" element={<><ProtectedRouteAdmin><EditDoctorPage/></ProtectedRouteAdmin></>} />
          <Route path="/receptionist" element={<><ProtectedRouteAdmin><ReceptionistPage columns={receptionistColumns} type="admin" /></ProtectedRouteAdmin></>} />
          <Route path="/doc/receptionist" element={<ProtectedRoute><ReceptionistPage columns={receptionistColumns} type="doctor" /></ProtectedRoute>} />
          <Route path="/receptionist/:referenceNo" element={<><ProtectedRouteAdmin><Viewreceptionist type="admin"/></ProtectedRouteAdmin></>} />
          <Route path="/doc/receptionist/:referenceNo" element={<><ProtectedRoute><Viewreceptionist type="doctor"/></ProtectedRoute></>} />

          <Route path="/receptionist/edit/:referenceNo" element={<><ProtectedRouteAdmin><EditReceptionist type="admin"/></ProtectedRouteAdmin></>} />
          <Route path="/doc/receptionist/edit/:referenceNo" element={<><ProtectedRoute><EditReceptionist type="doctor"/></ProtectedRoute></>} />

          <Route path="/patient" element={<><ProtectedRouteAdmin><PatientPage columns={patientColumns} type="admin"/></ProtectedRouteAdmin></>} />
          <Route path="/doc/patient" element={<><ProtectedRoute><PatientPage columns={patientColumns} type="doctor"/></ProtectedRoute></>} />
          <Route path="/recep/patient" element={<><ProtectedRouteRecep><PatientPage columns={patientColumns} type="recep"/></ProtectedRouteRecep></>} />

          <Route path="/patient/:referenceNo" element={<><ProtectedRouteAdmin><ViewPatient type="admin"/></ProtectedRouteAdmin></>} />
          <Route path="/doc/patient/:referenceNo" element={<><ProtectedRoute><ViewPatient type="doctor"/></ProtectedRoute></>} />
          <Route path="/recep/patient/:referenceNo" element={<><ProtectedRouteRecep><ViewPatient type="recep"/></ProtectedRouteRecep></>} />

          <Route path="/patient/edit/:referenceNo" element={<><ProtectedRouteAdmin><EditPatient type="admin"/></ProtectedRouteAdmin></>} />
          <Route path="/doc/patient/edit/:referenceNo" element={<><ProtectedRoute><EditPatient type="doctor"/></ProtectedRoute></>} />
          <Route path="/recep/patient/edit/:referenceNo" element={<><ProtectedRouteRecep><EditPatient type="recep"/></ProtectedRouteRecep></>} />

          <Route path="/doctor/signup" element={<><ProtectedRouteAdmin><AddDoctorPage/></ProtectedRouteAdmin></>} />
          <Route path="/receptionist/signup" element={<><ProtectedRouteAdmin><AddReceptionistPage type="admin"/></ProtectedRouteAdmin></>} />
          <Route path="/doc/receptionist/signup" element={<><ProtectedRoute><AddReceptionistPage type="doctor"/></ProtectedRoute></>} />

          <Route path="/messages" element={<><ProtectedRouteAdmin><MessagePage type="admin"/></ProtectedRouteAdmin></>} />
          <Route path="/doc/messages" element={<><ProtectedRoute><MessagePage type="doctor"/></ProtectedRoute></>} />
          <Route path="/recep/messages" element={<><ProtectedRouteRecep><MessagePage type="recep"/></ProtectedRouteRecep></>} />

          <Route path="/jinu" element={<><Prescription/></>} />

        </Routes>
        <ToastContainer position="top-center" />

      </BrowserRouter>
    </>
  );
}

export default App;
