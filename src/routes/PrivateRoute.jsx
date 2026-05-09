import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [userData] = useUser();
    console.log("PrivateRoute: user =", user, "loading =", loading, "location =", location);
    
    if (loading) {
        return <div>Loading...</div>;
    }
   
    if (!user) {
        return <Navigate state={location.pathname} to="/login" replace />;
    }


     if(userData?.isBanned){

   return <Navigate to="/banned" replace />;
}
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;