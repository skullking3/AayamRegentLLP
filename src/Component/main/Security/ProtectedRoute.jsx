import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('staffRole');
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // 👈 Change to isAuthenticated
  const userData = localStorage.getItem('user');

  console.log('🛡️ ProtectedRoute Check:', { 
    isAuthenticated, 
    userRole, 
    allowedRoles,
    hasUserData: !!userData 
  });

  // Check authentication
  if (!isAuthenticated || isAuthenticated !== 'true') {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/staff-login" replace />;
  }

  // Check role authorization
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    console.log('❌ Role not allowed:', userRole, 'Allowed:', allowedRoles);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
          <p className="text-xl mb-2">Access Denied</p>
          <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-[#E2B747] text-black px-6 py-2 rounded-lg font-bold hover:bg-white transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  console.log('✅ Access granted - Role:', userRole);
  return children;
};

export default ProtectedRoute;