import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom' 
import logo from '../assets/Logo.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false); 
  const [notifications, setNotifications] = useState([]); 
  const [user, setUser] = useState(null); 

  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // Function to sync auth state from localstorage
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
    // 1. Initial execution on mount
    syncAuthState();

    // 2. Dynamic Live Storage Event: Jab dusre components storage badlenge (bina reload ke updates)
    window.addEventListener('storage', syncAuthState);
    
    // Custom trigger handler taaki same-window login events instantly capture ho ske
    window.addEventListener('authChange', syncAuthState);

    // 3. Notifications Polling Setup
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

    // Cleanup listeners
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('authChange', syncAuthState);
    };
  }, [BASE_URL]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
    // Notify other components if needed
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
      {/* LEFT AREA: Logo & Mobile Profile Action */}
      <div className="flex items-center justify-between w-full md:w-auto px-4 md:px-[2.5vw]">
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img 
            src={logo} 
            alt="Aayam Regent LLP LOGO"
            className="h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* MOBILE LAYOUT BAR CONTROLS */}
        <div className="flex items-center gap-3 md:hidden">
          {/* 📱 MOBILE PROFILE LINK: Automatically appends instantly on login */}
          {user && (
            <div 
              onClick={() => navigate('/profile')}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-[#E2B747] font-bold text-sm cursor-pointer hover:border-[#E2B747] transition-all"
              title="View Profile"
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-zinc-300 hover:text-white focus:outline-none p-2"
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

      {/* RIGHT AREA: Nav items */}
      <div 
        className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 text-sm font-medium text-zinc-400 mt-4 md:mt-0 w-full md:w-auto transition-all duration-300`}
        onClick={() => setShowNotif(false)}
      >
        <Link to="/destinations" onClick={() => setIsOpen(false)} className="hover:text-white transition">Destination</Link>
        <Link to="/aayam-club" onClick={() => setIsOpen(false)} className="hover:text-white transition">Aayam Club</Link>
        
        <a href="#offers-section" onClick={handleOffersClick} className="hover:text-white transition cursor-pointer">
          Offers
        </a>

        {/* 🔔 NOTIFICATION DROPDOWN */}
        <div 
          className="relative w-full md:w-auto"
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
          className="hover:text-white transition w-full md:w-auto py-1 md:py-0"
        >
          About Us
        </Link>
        
        {/* 💻 DESKTOP AUTH LAYOUT VIEW */}
        {user ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto border-t border-zinc-900 pt-3 md:pt-0 md:border-none">
            <div 
              onClick={() => { setIsOpen(false); navigate('/profile'); }}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition"
            >
              <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-[#E2B747] font-bold text-xs uppercase">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-zinc-200 font-medium text-xs tracking-wide">Hi, {user.name || 'User'}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-red-400/80 hover:text-red-400 text-xs font-medium cursor-pointer py-1 md:py-0 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)} 
            className="bg-zinc-900 border border-zinc-800 text-[#E2B747] hover:bg-[#E2B747] hover:text-black transition-all duration-300 px-6 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center w-full md:w-auto"
          >
            Log-In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header;