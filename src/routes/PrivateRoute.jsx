import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log("PrivateRoute: user =", user, "loading =", loading, "location =", location);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate state={location.pathname} to="/login" replace />;
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;