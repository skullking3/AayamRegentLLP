import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Head from './Component/Header.jsx';
import Main from './Component/Main.jsx';
import Footer from './Component/Footer.jsx';
import StaffLogin from './Component/main/Login/StaffLogin.jsx';
import UserLogin from './Component/main/Login/UserLogin.jsx'; // 👈 1. Naya Dual Auth Component Import kiya

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
        
        {/* ─── 2. USER LOGIN / REGISTRATION ROUTE ─── */}
        <Route 
          path="/login" 
          element={
            <Layout>
              <UserLogin />
            </Layout>
          } 
        />
        
        {/* Staff Login Portal Route */}
        <Route 
          path="/staff-login" 
          element={
            <Layout>
              <StaffLogin />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;