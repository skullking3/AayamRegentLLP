import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StaffLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' }); 
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMessage('');
  
  try {
    const API_URL = import.meta.env.VITE_API_URL; 
    const response = await fetch(`${API_URL}/api/staff/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.success) { 
        // 1. Role aur User Data set karo (Dashboard.jsx ke liye ye zaroori hai)
        localStorage.setItem('staffRole', data.role); // Role: SuperAdmin, Manager, etc.
        localStorage.setItem('user', JSON.stringify({ name: data.username }));
        
        // 2. SABKO ek hi dashboard par bhejo
        navigate('/dashboard'); 
    } else {
        setErrorMessage(data.message || 'Unauthorized Gateway! Invalid Credentials.');
    }
  } catch (error) {
    setErrorMessage('Network Connection Refused! Make sure Spring Boot Server is running.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-black flex items-center justify-center font-sans px-4 py-12 relative overflow-hidden select-none">
      
      {/* Background Luxury Ambient Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#E2B747]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#E2B747]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphism Portal Box Container */}
      <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/80 p-8 md:p-10 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.5)] relative z-10">
        
        {/* Brand Headings Header Grid */}
        <div className="text-center mb-8">
          <span className="text-[9px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-2">
            Internal Secure Gateway
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wider font-normal uppercase">
            Aayam Regent <span className="text-[#E2B747]">Group</span>
          </h2>
          <p className="text-xs text-gray-400 font-light mt-2">
            Authorized Personnel & Management Access Portal Only
          </p>
        </div>

        {/* Input Interactive Fields Form Area */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* USERNAME / ID FIELD SYSTEM */}
          <div className="relative group">
            <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block mb-2 group-focus-within:text-[#E2B747] transition-colors">
              Username
            </label>
            <div className="relative h-12">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-[#E2B747] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <input 
                type="text" 
                name="username" 
                required
                autoComplete="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your hotel username" 
                className="w-full h-full pl-11 pr-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] focus:shadow-[0_0_15px_rgba(226,183,71,0.05)] transition-all duration-300 font-light"
              />
            </div>
          </div>

          {/* Password Input Protection Field */}
          <div className="relative group">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block group-focus-within:text-[#E2B747] transition-colors">
                Security Password
              </label>
              <a href="#forgot" className="text-[10px] text-gray-500 hover:text-[#E2B747] tracking-wider transition-colors">
                Forgot Verification?
              </a>
            </div>
            <div className="relative h-12">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-[#E2B747] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </span>
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full h-full pl-11 pr-12 rounded-xl bg-zinc-950/90 border border-zinc-800/80 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] focus:shadow-[0_0_15px_rgba(226,183,71,0.05)] transition-all duration-300 font-light"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-red-900 transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me Session Storage Trigger */}
          <div className="flex items-center">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="sr-only peer"
              />
              <div className="w-4 h-4 rounded bg-zinc-950 border border-zinc-800 peer-checked:bg-[#E2B747] peer-checked:border-[#E2B747] flex items-center justify-center transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="black" className="w-2.5 h-2.5 hidden peer-checked:block">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-[11px] font-medium tracking-wide text-gray-400 group-hover:text-gray-300 transition-colors">
                Trust this device for 30 days
              </span>
            </label>
          </div>

          {/* LIVE ERROR CONTAINER */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-xs text-center font-light tracking-wide animate-pulse">
              {errorMessage}
            </div>
          )}

          {/* Verification Call To Action Master Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#E2B747] text-black rounded-xl text-xs font-bold tracking-widest uppercase shadow-md hover:bg-white hover:shadow-[0_10px_30px_rgba(226,183,71,0.25)] active:scale-[0.99] disabled:bg-zinc-800 disabled:text-gray-500 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying Credentials...
              </>
            ) : (
              "Secure Log In"
            )}
          </button>

        </form>

        {/* Back Link to Public Main Platform */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-[10px] text-gray-500 hover:text-white font-medium tracking-wider uppercase transition-colors inline-flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Return to Public Showcase Website
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StaffLogin;