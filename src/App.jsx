import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import AdminDashboard from './Component/main/Staff/AdminDashboard.jsx';
import ManagerDashboard from './Component/main/Staff/MangerDashbord.jsx';
import Emp from './Component/main/Staff/Emp.jsx'
import ProtectedRoute from './Component/main/Staff/ProtectedRoute.jsx';

// 2. Layout Wrapper
const Layout = ({ children }) => (
  <div className="bg-[#0b0e14] min-h-screen text-white flex flex-col justify-between">
    <Head />
    <div className="flex-grow">{children}</div>
    <Footer />
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
        <Route path="/aayam-club" element={<Layout><AayamClub /></Layout>} />
        <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />

        {/* --- Protected Admin Route --- */}
        <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['SuperAdmin']}>
              <AdminDashboard />
            </ProtectedRoute>
        } />

        {/* --- Protected Manager Route --- */}
        <Route path="/manager" element={
            <ProtectedRoute allowedRoles={['SuperAdmin', 'Manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
        } />
        {/* --- Protected Manager Route --- */}
        <Route path="/Emp" element={
            <ProtectedRoute allowedRoles={['Employee', 'Oprator']}>
              <Emp/>
            </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;