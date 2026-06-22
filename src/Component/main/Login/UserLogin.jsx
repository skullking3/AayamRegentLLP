import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // ─── CONNECT TO JAVA LOGIN API ───
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData)); // Client browser storage saved
        alert(`🎉 Welcome back, ${userData.name}! Redirecting to home...`);
        navigate('/'); // Login hote hi home page redirection
      } else {
        const errorMsg = await response.text();
        alert(errorMsg || "Invalid credentials!");
      }
    } catch (err) {
      alert("❌ Java Backend Server is offline!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0e14] flex items-center justify-center font-sans px-4 py-12 relative overflow-hidden select-none">
      
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E2B747]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E2B747]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Premium Card View */}
      <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)] p-8 md:p-10 relative z-10">
        
        {/* Branding & Header */}
        <div className="text-center mb-8">
          <span className="text-[9px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-2">
            Aayam Privileges
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wider font-normal uppercase">
            Member <span className="text-[#E2B747]">Login</span>
          </h2>
          <p className="text-xs text-gray-500 font-light mt-2">
            Access your premium suites, billing details, and customized experiences.
          </p>
        </div>

        {/* Direct Functional Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          
          {/* Email Block */}
          <div>
            <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block mb-1.5">
              Registered Email
            </label>
            <input 
              type="email" 
              required 
              placeholder="vishal@example.com" 
              onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
              className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors" 
            />
          </div>

          {/* Password Block */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block">
                Password
              </label>
              <a href="#forgot" className="text-[10px] text-gray-500 hover:text-[#E2B747] transition-colors">
                Forgot?
              </a>
            </div>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
              className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors" 
            />
          </div>

          {/* Luxury CTA Button */}
          <button 
            type="submit" 
            className="w-full h-11 bg-[#E2B747] text-black rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 mt-4 shadow-md"
          >
            Sign In Securely
          </button>
          
        </form>

        {/* Footer Note */}
        <div className="text-center mt-8 pt-6 border-t border-zinc-800/60">
          <p className="text-[10px] text-gray-600 font-light tracking-wide">
            Protected Portal. Unauthorized access attempts are audited.
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserLogin;