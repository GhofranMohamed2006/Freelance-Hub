import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, token } = useAuth();

    console.log("ProtectedRoute:", {
        token,
        user,
        role: user?.role,
        allowedRoles,
    });

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;