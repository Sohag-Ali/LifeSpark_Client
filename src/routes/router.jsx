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
        path: "pricing",
        element: <PrivateRoute>
          <Pricing></Pricing>
        </PrivateRoute>
          
        
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
        // {
        //   index: true,
        //   element: <div>Dashboard Home</div>
        // },
        {
          path: 'my-lessons',
          element: <MyLessons></MyLessons>
        },
        {
          path: 'add-lesson',
          element: <AddLesson></AddLesson>
        },
        {
          path: 'favorites',
          element: <Favorites></Favorites>
        },
        {
          path: 'profile',
          element: <Profile></Profile>
        }
      ]
  }

]);