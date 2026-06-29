import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // Password hide/show toggle switch
  const [isLoading, setIsLoading] = useState(false); // Processing controller
  const [errorMessage, setErrorMessage] = useState(''); // Error state banner (Alert ka option)

  // ─── CONNECT TO JAVA LOGIN API ───
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Purane errors clear karein

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const userData = await response.json();
        
        // 1. Storage me user save karo
        localStorage.setItem('user', JSON.stringify(userData)); 
        
        // 2. 🔥 INSTANT SYNC: Header ko bina reload kiye batane ka event trigger
        window.dispatchEvent(new Event('authChange'));
        
        // 3. Smoothly navigate to home screen
        navigate('/'); 
      } else {
        const errorMsg = await response.text();
        setErrorMessage(errorMsg || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setErrorMessage("❌ Java Backend Server is offline!");
    } finally {
      setIsLoading(false); // Processing simulation end
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

        {/* 🚨 PREMIUM ERROR BANNER (Alert Box Ki Jagah Yeh Dikhega) */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium animate-fadeIn">
            {errorMessage}
          </div>
        )}

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
                  autoComplete="username" // <-- Yeh line add karo
                  placeholder="vishal@example.com" 
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                  className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors" 
                  disabled={isLoading}
                />
          </div>

          {/* Password Block (With Dynamic Eye Toggle Icon) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block">
                Password
              </label>
              <a href="#forgot" className="text-[10px] text-gray-500 hover:text-[#E2B747] transition-colors">
                Forgot?
              </a>
            </div>
            
            <div className="relative w-full flex items-center">
              <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  autoComplete="current-password" // <-- Yeh line add karo (Jaisa warning me bataya hai)
                  placeholder="••••••••" 
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                  className="w-full h-11 pl-4 pr-11 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors" 
                  disabled={isLoading}
                />
              
              {/* Sleek Minimalistic Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-zinc-500 hover:text-[#E2B747] focus:outline-none p-1 transition-colors"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? (
                  // Eye Slash Icon
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 💎 LUXURY CTA MOBILE & WEB DEVIATED BUTTON */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full h-11 text-black rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 mt-4 shadow-md flex items-center justify-center gap-2 select-none active:scale-[0.98] md:active:scale-100 ${
              isLoading 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50' 
                : 'bg-[#E2B747] hover:bg-white active:bg-zinc-200'
            }`}
          >
            {isLoading ? (
              <>
                {/* Golden Circular Spinner */}
                <svg className="animate-spin h-4 w-4 text-[#E2B747]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Sign In Securely</span>
            )}
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