import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'; // 1. useNavigate import karo

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState(''); // 2. userName state add karo
  const navigate = useNavigate(); // 3. navigate initialize karo

  useEffect(() => {
    const savedRole = localStorage.getItem('staffRole') || 'Employee';
    // 4. LocalStorage se user name fetch karo
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setRole(savedRole);
    setUserName(user.name || 'Staff Member');
  }, []);

  // 5. Logout function define karo
const handleLogout = () => {
    // 1. Sirf Login se juda data delete karo
    localStorage.removeItem('staffRole');
    localStorage.removeItem('user');
    
    // Agar koi token rakha hai toh use bhi aise hi hatana:
    // localStorage.removeItem('authToken');
    window.location.href = '/staff-login'; 
};
  const navItems = [
    { name: 'User Booking', path: 'bookingTable', allowed: ['SuperAdmin', 'Manager', 'Employee','Oprator'] },
    { name: 'Member Booking', path: 'members', allowed: ['SuperAdmin', 'Manager','Employee','Oprator'] },
    { name: 'Create Member', path: 'create-member', allowed: ['SuperAdmin', 'Manager'] },
    { name: 'Members Detailed', path: 'detail-member', allowed: ['SuperAdmin', 'Manager', 'Employee','Employee','Oprator'] },
    { name: 'Staff Management', path: 'EmpForm', allowed: ['SuperAdmin'] },
    { name: 'Staff Detailed', path: 'EmpDetail', allowed: ['SuperAdmin'] },
    { name: 'Settings', path: 'settings', allowed: ['SuperAdmin'] },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - flex flex-col add kiya taaki Logout niche rahe */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-zinc-800 p-6 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <h2 className="text-[#E2B747] font-serif text-xl mb-8">Aayam Admin</h2>
        
        <nav className="flex-1 space-y-4" onClick={() => setIsSidebarOpen(false)}>
          {navItems
            .filter(item => item.allowed.includes(role))
            .map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="block text-sm hover:text-[#E2B747] transition-colors"
              >
                {item.name}
              </Link>
          ))}
        </nav>

        {/* LOGOUT & PROFILE SECTION */}
        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="mb-4">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Logged in as</p>
            <p className="text-sm font-semibold truncate text-white">{userName}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-2 bg-red-900/20 border border-red-900/50 text-red-400 text-[10px] font-bold rounded-lg hover:bg-red-900/40 transition-all uppercase tracking-widest"
          >
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 p-8 transition-all">
        <button className="lg:hidden mb-4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰ Menu</button>
        <Outlet />
      </main>

      {isSidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default Dashboard;