import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Loader from "./pages/splash/loader";
import Weclome from "./pages/dashboard/index";
import DashboardDesign from "./pages/dashboard/newDashboardDesign";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/signup";
import FormLayout from "./components/forms/form_layout";
import FormformLayoutalidation from "./components/forms/form_validations";
import NotFound from "./pages/error/page-404";
import Table from "./components/dataviews/table";
import Grid from "./components/dataviews/grid";
import Calender from "./components/calender/calender";
import ViewProfile from "./components/profile/view";
import Layout from "./layout/layout";
import Forgetpassword from "./pages/Auth/forgetpassword";
import ResetPassword from "./pages/Auth/resetpassword";
import LocalStorageWatcher from "./utils/tokenValidator/authwatcher";
import Profile from "./pages/profile/main";
import UserView from "./pages/user/view";
import UserEdit from "./pages/user/edit";
import DoctorSignup from "./pages/Auth/doctorsignup";
import AppointmentSlots from "./components/calender/appointment";
import PatientTable from "./components/dataviews/patienttable";
import Dashboardforuser from "./../src/pages/welcomepages/welcomepage"

function App() {
  return (
    <>
      <Router>
        <LocalStorageWatcher />
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route
            path="/newDashboardDesign"
            element={
              <Layout>
                <DashboardDesign />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor-signup" element={<DoctorSignup />} />
          <Route path="/forget-password" element={<Forgetpassword />} />
          <Route path="//reset-password/:token" element={<ResetPassword />} />

          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/formLayout"
            element={
              <Layout>
                <FormLayout />
              </Layout>
            }
          />
          <Route
            path="/welcomeuser"
            element={
              <Layout>
                <Dashboardforuser />
              </Layout>
            }
          />
          <Route
            path="/formValidations"
            element={
              <Layout>
                <FormformLayoutalidation />
              </Layout>
            }
          />
          <Route
            path="/table"
            element={
              <Layout>
                <Table />
              </Layout>
            }
          />
          <Route
            path="/patienttable"
            element={
              <Layout>
                <PatientTable />
              </Layout>
            }
          />
          <Route
            path="/dcotors"
            element={
              <Layout>
                <Grid />
              </Layout>
            }
          />
          <Route
            path="/calender"
            element={
              <Layout>
                <Calender />
              </Layout>
            }
          />
          <Route
            path="/appointment"
            element={
              <Layout>
                <AppointmentSlots />
              </Layout>
            }
          />
          <Route
            path="/viewProfile"
            element={
              <Layout>
                <ViewProfile />
              </Layout>
            }
          />
          <Route
            path="/user-view/:userId"
            element={
              <Layout>
                <UserView />
              </Layout>
            }
          />
          <Route
            path="/edit/:userId"
            element={
              <Layout>
                <UserEdit />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
