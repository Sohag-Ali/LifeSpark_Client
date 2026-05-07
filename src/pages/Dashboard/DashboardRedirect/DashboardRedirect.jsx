import { Navigate } from "react-router";
import useUser from "../../../hooks/useUser";


const DashboardRedirect = () => {
     const [userData, isLoading] =
   useUser();

   if(isLoading){

      return (
         <span className="loading loading-spinner loading-lg"></span>
      );
   }

   // admin
   if(userData?.role === "admin"){

      return (
         <Navigate to="/dashboard/admin-home" />
      );
   }

   // user
   return (
      <Navigate to="/dashboard/user-home" />
   );
};


export default DashboardRedirect;