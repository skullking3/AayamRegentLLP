import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Head from './Component/Header.jsx';
import Main from './Component/Main.jsx';
import Footer from './Component/Footer.jsx';
import StaffLogin from './Component/main/Login/StaffLogin.jsx';
import UserLogin from './Component/main/Login/UserLogin.jsx'; 

// ─── NEW COMPONENT IMPORTS ───
import Location from './Component/main/Header/Location.jsx'; 
import StaffPortal from './Component/main/Staff/StaffPortal.jsx'; 
import AayamClub from './Component/main/Header/AayamClub.jsx';
import AboutUs from './Component/main/Header/AboutUs.jsx'

// Common layout for customer-facing pages
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
        
        {/* DESTINATIONS COMPONENT ROUTE */}
        <Route 
          path="/destinations" 
          element={
            <Layout>
              <Location />
            </Layout>
          } 
        />
        
        {/* USER LOGIN ROUTE */}
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

        {/* Aayam Club Member Page */}
        <Route 
          path="/aayam-club" 
          element={
            <Layout>
              <AayamClub />
            </Layout>
          } 
        />

        {/* About Us Page */}
        <Route 
          path="/about-us" 
          element={
            <Layout>
              <AboutUs />
            </Layout>
          } 
        />

        {/* ─── 🚨 FIXED STAFF PORTAL ROUTE (Without public Header/Footer) ─── */}
        {/* Management direct open karega: aayamregent.in/aayam-staff-portal */}
        <Route 
          path="/aayam-staff-portal" 
          element={<StaffPortal />} 
        />

      </Routes>
    </Router>
  );
};

export default App;