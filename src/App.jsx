import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Components
import Head from './Component/Header.jsx';
import Main from './Component/Main.jsx';
import Footer from './Component/Footer.jsx';
import StaffLogin from './Component/main/Login/StaffLogin.jsx';
import UserLogin from './Component/main/Login/UserLogin.jsx'; 
import Location from './Component/main/Header/Location.jsx'; 
import AayamClub from './Component/main/Header/AayamClub.jsx';
import AboutUs from './Component/main/Header/AboutUs.jsx';

// Protected Components
import Dashboard from './Component/main/Staff/Dashboard.jsx';
import ManagerDashboard from './Component/main/Staff/MangerDashbord.jsx';
import Emp from './Component/main/Staff/Emp.jsx';
import ProtectedRoute from './Component/main/Staff/ProtectedRoute.jsx';

// Management Components
import BookingTable from './Component/main/Management/BookingTable.jsx';
import MemeberRegistration from './Component/main/Management/Member_registration.jsx';
import MemeberDetailed from './Component/main/Management/Member_detailed.jsx';

// Layout Wrappers
const Layout = ({ children }) => (
  <div className="bg-[#0b0e14] min-h-screen text-white flex flex-col justify-between">
    <Head />
    <div className="flex-grow">{children}</div>
    <Footer />
  </div>
);

const StaffLayout = ({ children }) => (
  <div className="bg-gray-100 min-h-screen">
    {children}
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Layout><Main /></Layout>} />
        <Route path="/destinations" element={<Layout><Location /></Layout>} />
        <Route path="/login" element={<Layout><UserLogin /></Layout>} />
        <Route path="/staff-login" element={<Layout><StaffLogin /></Layout>} />
        {/* ... baaki public routes ... */}

        {/* --- CENTRALIZED DASHBOARD (Role-Based Access) --- */}
        <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['SuperAdmin', 'Manager', 'Employee', 'Oprator']}>
              <StaffLayout><Dashboard /></StaffLayout>
            </ProtectedRoute>
        }>
          {/* Ye sab Dashboard.jsx ke <Outlet /> mein open honge */}
          <Route path="bookingTable" element={<BookingTable />} />
          <Route path="create-member" element={<MemeberRegistration />} />
          <Route path="detail-member" element={<MemeberDetailed />} />
          {/* Tumhare specific dashboards ko bhi yahan la sakte ho */}
          <Route path="admin-home" element={<Dashboard />} />
          <Route path="manager-home" element={<ManagerDashboard />} />
          <Route path="emp-home" element={<Emp />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;