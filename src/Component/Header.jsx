import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom' 
import logo from '../assets/Logo.png'
import AgreementModal from './main/Login/AggrementModel.jsx' 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false); 
  const [notifications, setNotifications] = useState([]); 
  const [user, setUser] = useState(null); 
  
  const [showUserSidebar, setShowUserSidebar] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false); // Controlled visibility state
  const sidebarRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const syncAuthState = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser({ name: storedUser });
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    syncAuthState();
    window.addEventListener('storage', syncAuthState);
    window.addEventListener('authChange', syncAuthState);

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/public/notifications`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          throw new Error("API responded with error status");
        }
      } catch (error) {
        console.error("Backend error or offline:", error);
        setNotifications([]); 
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 30000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('authChange', syncAuthState);
    };
  }, [BASE_URL]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowUserSidebar(false);
      }
    };
    if (showUserSidebar) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showUserSidebar]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
    setShowUserSidebar(false); 
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const handleOffersClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToSection: 'offers-section' } });
    } else {
      const element = document.getElementById('offers-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleNotifClick = (e) => {
    e.stopPropagation();
    setShowNotif(!showNotif);
  };

  return (
    <nav 
      style={{
        '--glow-color': 'rgba(114, 115, 192, 0.25)',
        backgroundImage: 'radial-gradient(100% 150% at 50% 0%, var(--glow-color) 0%, rgba(0,0,0,0) 70%), radial-gradient(35% 100% at 50% 0%, var(--glow-color) 0%, rgba(0,0,0,0) 100%)'
      }}
      className="w-full bg-black px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between text-white border-b border-zinc-900/50 relative z-50 select-none"
    >
      <div className="flex items-center justify-between w-full md:w-auto px-4 md:px-[2.5vw] relative z-50">
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img 
            src={logo} 
            alt="Aayam Regent LLP LOGO"
            className="h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="flex items-center gap-2 md:hidden relative z-[99]">
          {user && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowUserSidebar(true);
              }}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-[#E2B747] font-bold text-sm cursor-pointer hover:border-[#E2B747] active:scale-95 transition-all touch-manipulation m-1"
              title="Open Account Menu"
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </button>
          )}

          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }} 
            className="text-zinc-300 hover:text-white focus:outline-none p-2 touch-manipulation"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div 
        className={`${isOpen ? 'flex pointer-events-auto' : 'hidden md:flex pointer-events-none md:pointer-events-auto'} flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 text-sm font-medium text-zinc-400 mt-4 md:mt-0 w-full md:w-auto transition-all duration-300 relative z-40`}
        onClick={() => setShowNotif(false)}
      >
        <Link to="/destinations" onClick={() => setIsOpen(false)} className="hover:text-white transition pointer-events-auto">Destination</Link>
        <Link to="/aayam-club" onClick={() => setIsOpen(false)} className="hover:text-white transition pointer-events-auto">Aayam Club</Link>
        
        <a href="#offers-section" onClick={handleOffersClick} className="hover:text-white transition cursor-pointer pointer-events-auto">
          Offers
        </a>

        <div 
          className="relative w-full md:w-auto pointer-events-auto"
          onMouseEnter={() => setShowNotif(true)}
          onMouseLeave={() => setShowNotif(false)}
        >
          <button 
            onClick={handleNotifClick}
            className="hover:text-white transition flex items-center gap-1.5 w-full md:w-auto text-left py-1 md:py-0 focus:outline-none"
          >
            Notification 
            {notifications.length > 0 && (
              <span className="w-1.5 h-1.5 bg-[#E2B747] rounded-full animate-pulse" />
            )}
          </button>

          {showNotif && (
            <div 
              className="absolute left-0 md:left-auto md:right-0 mt-2 w-72 md:w-80 bg-zinc-950/95 backdrop-blur-xl border border-zinc-900 rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-50 animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5 mb-3">
                <span className="text-[10px] font-bold tracking-widest text-[#E2B747] uppercase">Latest Updates</span>
                <span className="text-[9px] text-zinc-500 font-mono">{notifications.length} Messages</span>
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {notifications.length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-4 font-light">No new announcements.</p>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-2.5 bg-zinc-900/40 border border-zinc-900/60 rounded-xl hover:border-zinc-800 transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wider scale-90 ${
                          notif.type === 'warning' || notif.type === 'WARNING'
                            ? 'bg-amber-500/10 text-amber-400' 
                            : notif.type === 'success' || notif.type === 'SUCCESS' || notif.type === 'OFFER'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-[#E2B747]/10 text-[#E2B747]'
                        }`}>
                          {notif.type || 'NEWS'}
                        </span>
                        <h4 className="text-xs font-serif text-zinc-200 font-medium truncate">{notif.title}</h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <Link 
          to="/about-us" 
          onClick={() => setIsOpen(false)} 
          className="hover:text-white transition w-full md:w-auto py-1 md:py-0 pointer-events-auto"
        >
          About Us
        </Link>
        
        {user ? (
          <div className="hidden md:flex items-center gap-3 pointer-events-auto">
            <div 
              onClick={() => setShowUserSidebar(true)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-[#E2B747] font-bold text-xs uppercase group-hover:border-[#E2B747]/60 transition-colors">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-zinc-200 group-hover:text-white font-medium text-xs tracking-wide transition-colors">
                Hi, <span className="text-[#E2B747]">{user.name || 'User'}</span> ▾
              </span>
            </div>
          </div>
        ) : (
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)} 
            className="bg-zinc-900 border border-zinc-800 text-[#E2B747] hover:bg-[#E2B747] hover:text-black transition-all duration-300 px-6 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center w-full md:w-auto pointer-events-auto block"
          >
            Log-In
          </Link>
        )}
      </div>

      {user && (
        <div className={`fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${showUserSidebar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div 
            ref={sidebarRef}
            className={`fixed top-0 right-0 h-full w-[290px] sm:w-[350px] bg-[#0b0e14] border-l border-zinc-900/80 shadow-[[-15px_0_40px_rgba(0,0,0,0.7)]] p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out ${showUserSidebar ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={(e) => e.stopPropagation()} 
          >
            <div>
              <div className="flex items-center justify-between border-b border-zinc-900 pb-5 mb-6">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#E2B747] uppercase">Account Console</h3>
                <button 
                  type="button"
                  onClick={() => setShowUserSidebar(false)}
                  className="text-zinc-500 hover:text-white transition text-xs p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-900 p-4 rounded-2xl flex flex-col items-center text-center space-y-3 mb-6">
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 text-[#E2B747] font-serif font-bold text-lg flex items-center justify-center shadow-inner">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h4 className="text-sm font-serif font-medium text-white">{user.name || 'Aayam Member'}</h4>
                  <span className="text-[9px] font-mono tracking-widest text-[#E2B747] uppercase px-2 py-0.5 bg-[#E2B747]/5 border border-[#E2B747]/20 rounded-md mt-1 inline-block">
                    {user.role || 'MEMBER'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 px-1 text-xs">
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[10px] text-zinc-500 font-light tracking-wide">Registered Email</span>
                  <span className="text-zinc-300 font-medium break-all">{user.email || 'Not setup yet'}</span>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[10px] text-zinc-500 font-light tracking-wide">Phone Reference</span>
                  <span className="text-zinc-300 font-medium">{user.phone || 'Not setup yet'}</span>
                </div>
                {user.address && (
                  <div className="flex flex-col space-y-0.5">
                    <span className="text-[10px] text-zinc-500 font-light tracking-wide">Primary Location</span>
                    <span className="text-zinc-300 font-medium truncate">{user.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 border-t border-zinc-900 pt-5">
              <button 
                type="button"
                onClick={() => {
                  setShowUserSidebar(false); 
                  setShowAgreementModal(true); // Is click se modal handle hoga
                }}
                className="w-full h-11 border border-zinc-850 hover:border-zinc-750 bg-[#E2B747]/5 hover:bg-[#E2B747]/10 text-[#E2B747] font-medium text-xs rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(226,183,71,0.05)]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Agreement Licenses
              </button>

              <button 
                type="button"
                onClick={() => { setShowUserSidebar(false); navigate('/profile'); }}
                className="w-full h-11 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-white font-medium text-xs rounded-xl transition duration-200 cursor-pointer"
              >
                View Complete Profile
              </button>
              
              <button 
                type="button"
                onClick={handleLogout}
                className="w-full h-11 bg-red-950/10 hover:bg-red-950/20 border border-red-900/20 text-red-400 font-medium text-xs rounded-xl transition duration-200 cursor-pointer"
              >
                Secure Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 📦 DYNAMIC REAL API CONNECTED MODAL CONSOLE ─── */}
      {/* 👈 FIXED: Yahan state validation lagaya hai, aur user ke model se agreement URL direct pass kiya hai */}
      {showAgreementModal && (
        <AgreementModal 
          documentUrl={user?.agreementUrl || ""} // MongoDB model me user data ke andar jo link hai vo chala jayega
          onClose={() => setShowAgreementModal(false)} 
        />
      )}

    </nav>
  )
}

export default Header;