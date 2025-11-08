import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => { 
    const { user, loading } = useAuth()
      if (loading)
        return <p className="text-center py-10">Checking authentication...</p>;
    if (!user) return <Navigate to="/login" replace />;
    
    return children;
}

export default ProtectedRoute;