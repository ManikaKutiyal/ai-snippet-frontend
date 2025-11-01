import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // If there's no token, redirect the user to the /login page
    // 'replace' stops them from using the back button to go back
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the component they were trying to access
  return children;
};

export default ProtectedRoute;
