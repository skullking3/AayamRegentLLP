import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Head from './Component/Header.jsx';
import Main from './Component/Main.jsx';
import Footer from './Component/Footer.jsx';
import StaffLogin from './Component/main/Login/StaffLogin.jsx';
import UserLogin from './Component/main/Login/UserLogin.jsx'; 

// ─── NEW COMPONENT IMPORTS ───
import Location from './Component/main/Header/Location.jsx'; // 👈 Destination page ke liye
import StaffPortal from './Component/main/Staff/StaffPortal.jsx'; // 👈 Staff dashboard panel ke liye
import AayamClub from './Component/main/Header/AayamClub.jsx';
import AboutUs from './Component/main/Header/AboutUs.jsx'

const Layout = ({ children }) => {
  return (
    <div className="bg-[#0b0e14] min-h-screen text-white flex flex-col justify-between">
      <Head />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Website Landing Page Route */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Main />
            </Layout>
          } 
        />
        
        {/* ─── NEW: DESTINATIONS COMPONENT ROUTE ─── */}
        <Route 
          path="/destinations" 
          element={
            <Layout>
              <Location />
            </Layout>
          } 
        />
        
        {/* USER LOGIN ROUTE (Only Login, No Registration) */}
        <Route 
          path="/login" 
          element={
            <Layout>
              <UserLogin />
            </Layout>
          } 
        />
        
        {/* Staff Secret Login Page Route */}
        <Route 
          path="/staff-login" 
          element={
            <Layout>
              <StaffLogin />
            </Layout>
          } 
        />
        <Route 
        path="/aayam-club" 
        element={
          <Layout>
            <AayamClub />
            </Layout>
          } />

          <Route path="/about-us" element={<AboutUs />} />

        {/* ─── NEW: HIDDEN STAFF PORTAL DASHBOARD ROUTE ─── */}
        <Route 
          path="/aayam-staff-portal" 
          element={
            <Layout>
              <StaffPortal />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;