import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Main2 from "../../Layout/Main2";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PasswordRecovery from "../../Pages/PasswordRecovery/PasswordRecovery";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctor from "../../Pages/Dashboard/ManageDoctor/ManageDoctor";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
    ],
  },
  {
    path: "/",
    element: <Main2></Main2>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/passwordRecovery",
        element: <PasswordRecovery></PasswordRecovery>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addDoctor",
        element: (
          <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageDoctor",
        element: (
          <AdminRoute>
            <ManageDoctor></ManageDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://doctors-portal-server-psi.vercel.app/bookings/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
