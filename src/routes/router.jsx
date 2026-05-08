import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PublicLessons from "../pages/PublicLessons/PublicLessons";
import Pricing from "../pages/Pricing/pricing";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyLessons from "../pages/Dashboard/MyLesson/MyLessons";
import AddLesson from "../pages/Dashboard/AddLesson/AddLesson";
import Favorites from "../pages/Dashboard/Favorites/Favorites";
import Profile from "../pages/Dashboard/Profile/Profile";
import PaymentSuccess from "../pages/Pricing/PaymentSuccess";
import PaymentCancel from "../pages/Pricing/PaymentCancel";
import UpdateLesson from "../pages/Dashboard/MyLesson/UpdateLesson";
import LessonDetails from "../pages/DetailsPage/LessonDetails";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import DashboardRedirect from "../pages/Dashboard/DashboardRedirect/DashboardRedirect";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageLessons from "../pages/Dashboard/Admin/ManageLessons/ManageLessons";
import ReportedLessons from "../pages/Dashboard/Admin/ReportedLessons/ReportedLessons";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import CommentSection from "../pages/DetailsPage/CommentSection";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "public-lessons",
        Component: PublicLessons
       
      },
      {
        path: "/lesson-details/:id",
        element: <PrivateRoute>
          <LessonDetails></LessonDetails>
         </PrivateRoute>
      },
     
      {
        path: "pricing",
        element: <PrivateRoute>
          <Pricing></Pricing>
        </PrivateRoute>
      },
      {
        path: "payment-success",
        Component: PaymentSuccess
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel
      },
      {
        path: "comment-section",
        Component:CommentSection
      }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login

      },
      {
        path: "register",
        Component: Register
      }
    ]
  },

  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
      children: [
        {
          index: true,
          element: <DashboardRedirect></DashboardRedirect>
        },
        {
          path: 'user-home',
          element: <DashboardHome></DashboardHome>
        },
        {
          path: 'my-lessons',
          element: <MyLessons></MyLessons>
        },
        {
          path: 'add-lesson',
          element: <AddLesson></AddLesson>
        },
        {
          path: 'update-lesson/:id',
          element: <PrivateRoute>
            <UpdateLesson></UpdateLesson>
          </PrivateRoute>
        },
        {
          path: 'favorites',
          element: <Favorites></Favorites>
        },
         {
          path: 'admin-home',
          element: <AdminHome></AdminHome>
        },
        {
          path:'admin/manage-users',
          element: <ManageUsers></ManageUsers>
        },
        {
          path:'admin/manage-lessons',
          element: <ManageLessons></ManageLessons>
        },
         {
          path:'admin/reported-lessons',
          element: <ReportedLessons></ReportedLessons>
        },
        {
          path: 'profile',
          element: <Profile></Profile>
        },
        {
          path: 'admin/admin-profile',
          element: <AdminProfile></AdminProfile>
        }
      ]
  }

]);