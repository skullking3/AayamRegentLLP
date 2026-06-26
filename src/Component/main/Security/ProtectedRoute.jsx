import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('staffRole');
  const isAuthenticated = localStorage.getItem('staffToken');

  if (!isAuthenticated) {
    return <Navigate to="/staff-login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Ya wapas dashboard bhej do
  }

  return children;
};

export default ProtectedRoute;
