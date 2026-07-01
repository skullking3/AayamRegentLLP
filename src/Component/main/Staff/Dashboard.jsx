import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication first
    checkAuth();
  }, []);

  const checkAuth = () => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('staffRole');
    const userData = localStorage.getItem('user');

    console.log('🔍 Auth Check:', { authStatus, savedRole, userData });

    if (!authStatus || authStatus !== 'true' || !userData) {
      console.log('❌ Not authenticated, redirecting to login...');
      // Redirect to login
      navigate('/staff-login', { replace: true });
      // Alternative: window.location.href = '/staff-login';
      return;
    }

    try {
      const user = JSON.parse(userData);
      setRole(savedRole || 'Employee');
      setUserName(user.name || 'Staff Member');
      setIsAuthenticated(true);
      console.log('✅ Authenticated as:', user.name, 'Role:', savedRole);
    } catch (error) {
      console.error('❌ Error parsing user data:', error);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    
    // Clear ALL auth-related data
    localStorage.removeItem('staffRole');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    
    // Clear session storage also (agar use karte ho)
    sessionStorage.clear();
    
    // Redirect to login
    navigate('/staff-login', { replace: true });
    // Alternative: window.location.href = '/staff-login';
  };

  const navItems = [
    { name: 'User Booking', path: 'bookingTable', allowed: ['SuperAdmin', 'Manager', 'Employee', 'Operator'] },
    { name: 'Member Booking', path: 'members', allowed: ['SuperAdmin', 'Manager', 'Employee', 'Operator'] },
    { name: 'Create Member', path: 'create-member', allowed: ['SuperAdmin', 'Manager'] },
    { name: 'Members Detailed', path: 'detail-member', allowed: ['SuperAdmin', 'Manager', 'Employee', 'Operator'] },
    { name: 'Staff Management', path: 'EmpForm', allowed: ['SuperAdmin'] },
    { name: 'Staff Detailed', path: 'EmpDetail', allowed: ['SuperAdmin'] },
    { name: 'Notification Setting', path: 'NotiHandler', allowed: ['SuperAdmin', 'Manager', 'Employee', 'Operator'] },
    { name: 'Offers Setting', path: 'OffersHandler', allowed: ['SuperAdmin', 'Manager', 'Employee', 'Operator'] },
    { name: 'Club Setting', path: 'ClubHandler', allowed: ['SuperAdmin', 'Manager', 'Employee', 'Operator'] },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-[#E2B747] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 bg-zinc-800 p-2 rounded-lg text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-zinc-800 p-6 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="mb-8">
          <h2 className="text-[#E2B747] font-serif text-xl">Aayam Regent</h2>
          <p className="text-xs text-gray-500 mt-1">Dashboard</p>
        </div>
        
        <nav className="flex-1 space-y-4 overflow-y-auto" onClick={() => setIsSidebarOpen(false)}>
          {navItems
            .filter(item => item.allowed.includes(role))
            .map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="block text-sm hover:text-[#E2B747] transition-colors py-1"
              >
                {item.name}
              </Link>
          ))}
          
          {navItems.filter(item => item.allowed.includes(role)).length === 0 && (
            <p className="text-gray-500 text-xs">No accessible modules</p>
          )}
        </nav>

        {/* User Info & Logout */}
        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="mb-4">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Logged in as</p>
            <p className="text-sm font-semibold truncate text-white">{userName}</p>
            <p className="text-[10px] text-[#E2B747] mt-1">{role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-2 bg-red-900/20 border border-red-900/50 text-red-400 text-[10px] font-bold rounded-lg hover:bg-red-900/40 transition-all uppercase tracking-widest"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-8 transition-all">
        <Outlet />
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;