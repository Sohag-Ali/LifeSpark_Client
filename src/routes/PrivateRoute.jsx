import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import Loading from "../coponents/LoadingPage/Loading";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [userData, isLoading] = useUser();
    console.log("PrivateRoute: user =", user, "loading =", loading, "location =", location);

    if (loading || isLoading) {
        return <Loading></Loading>
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