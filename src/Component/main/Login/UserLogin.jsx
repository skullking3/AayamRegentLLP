import React, { useState } from 'react';

const UserAuth = () => {
  // 'login' matlb right side active, 'register' matlb left side active
  const [activeTab, setActiveTab] = useState('login');
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '', password: '' });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Connecting to Spring Boot Login API:", loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Connecting to Spring Boot Register API:", registerData);
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0e14] flex items-center justify-center font-sans px-4 py-12 relative overflow-hidden select-none">
      
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#E2B747]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E2B747]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container Wrapper */}
      <div className="w-full max-w-5xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row min-h-[580px] relative">
        
        {/* ─── LEFT SIDE: USER REGISTRATION ─── */}
        <div 
          onClick={() => activeTab !== 'register' && setActiveTab('register')}
          className={`transition-all duration-500 ease-in-out p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-800/80 ${
            activeTab === 'register' 
              ? 'w-full md:w-[55%] bg-[#121620]/30' 
              : 'w-full md:w-[45%] bg-transparent cursor-pointer hover:bg-zinc-800/10'
          }`}
        >
          {activeTab === 'register' ? (
            /* Active Registration Form */
            <div className="w-full max-w-md mx-auto opacity-100 transition-opacity duration-300">
              <span className="text-[9px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-2">
                Join Aayam Privileges
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wider font-normal uppercase mb-6">
                Create <span className="text-[#E2B747]">Account</span>
              </h2>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block mb-1.5">Full Name</label>
                  <input 
                    type="text" required placeholder="Vishal Kumar"
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block mb-1.5">Email Address</label>
                  <input 
                    type="email" required placeholder="vishal@example.com"
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block mb-1.5">Phone Number</label>
                  <input 
                    type="tel" required placeholder="+91 XXXXX XXXXX"
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block mb-1.5">Choose Password</label>
                  <input 
                    type="password" required placeholder="••••••••"
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors"
                  />
                </div>

                <button type="submit" className="w-full h-11 bg-white text-black rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#E2B747] transition-all duration-300 mt-2 shadow-md">
                  Register Now
                </button>
              </form>
            </div>
          ) : (
            /* Inactive State: Normal Heading */
            <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center h-full py-6 md:py-0">
              <span className="text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase block mb-2">New Guest?</span>
              <h3 className="text-xl font-serif text-gray-400 tracking-wider uppercase mb-3">User Registration</h3>
              <p className="text-xs text-gray-600 font-light max-w-xs text-center md:text-left mb-4">
                Discover bespoke hospitality, exclusive members-only rates, and tailored experiences.
              </p>
              <span className="text-[10px] font-semibold tracking-widest text-[#E2B747] uppercase border-b border-dashed border-[#E2B747]/40 pb-0.5">
                Click to Register →
              </span>
            </div>
          )}
        </div>

        {/* ─── RIGHT SIDE: USER LOGIN ─── */}
        <div 
          onClick={() => activeTab !== 'login' && setActiveTab('login')}
          className={`transition-all duration-500 ease-in-out p-8 md:p-12 flex flex-col justify-center ${
            activeTab === 'login' 
              ? 'w-full md:w-[55%] bg-[#121620]/30' 
              : 'w-full md:w-[45%] bg-transparent cursor-pointer hover:bg-zinc-800/10'
          }`}
        >
          {activeTab === 'login' ? (
            /* Active Login Form */
            <div className="w-full max-w-md mx-auto opacity-100 transition-opacity duration-300">
              <span className="text-[9px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-2">
                Welcome Back Traveler
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wider font-normal uppercase mb-6">
                Guest <span className="text-[#E2B747]">Login</span>
              </h2>

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block mb-1.5">Registered Email</label>
                  <input 
                    type="email" required placeholder="vishal@example.com"
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase block">Password</label>
                    <a href="#forgot" className="text-[10px] text-gray-500 hover:text-[#E2B747]">Forgot?</a>
                  </div>
                  <input 
                    type="password" required placeholder="••••••••"
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#E2B747] transition-colors"
                  />
                </div>

                <button type="submit" className="w-full h-11 bg-[#E2B747] text-black rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 mt-2 shadow-md">
                  Sign In
                </button>
              </form>
            </div>
          ) : (
            /* Inactive State: Normal Heading */
            <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center h-full py-6 md:py-0">
              <span className="text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase block mb-2">Already Registered?</span>
              <h3 className="text-xl font-serif text-gray-400 tracking-wider uppercase mb-3">User Login</h3>
              <p className="text-xs text-gray-600 font-light max-w-xs text-center md:text-left mb-4">
                Access your premium suite bookings, transaction history, and personalized luxury details.
              </p>
              <span className="text-[10px] font-semibold tracking-widest text-[#E2B747] uppercase border-b border-dashed border-[#E2B747]/40 pb-0.5">
                ← Click to Sign In
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserAuth;