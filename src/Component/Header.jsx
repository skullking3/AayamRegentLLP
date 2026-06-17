import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // 👈 React Router imports add kiye
import logo from '../assets/Logo.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav 
      style={{
        '--glow-color': 'rgba(114, 115, 192, 0.25)',
        backgroundImage: 'radial-gradient(100% 150% at 50% 0%, var(--glow-color) 0%, rgba(0,0,0,0) 70%), radial-gradient(35% 100% at 50% 0%, var(--glow-color) 0%, rgba(0,0,0,0) 100%)'
      }}
      className="w-full bg-black px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between text-white border-b border-zinc-900/50 relative z-50 select-none"
    >
      {/* LEFT AREA: Logo and Mobile Toggle Menu */}
      <div className="flex items-center justify-between w-full md:w-auto px-4 md:px-[2.5vw]">
        {/* Clickable Logo - Redirects back to Home smoothly */}
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img 
            src={logo} 
            alt="Aayam Regent LLP LOGO"
            className="h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-zinc-300 hover:text-white focus:outline-none p-2"
          aria-label="Toggle Menu"
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

      {/* RIGHT AREA: Main Navigation List Links & Login CTA */}
      <div className={`${
        isOpen ? 'flex animate-fadeIn' : 'hidden'
      } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 text-sm font-medium text-zinc-400 mt-4 md:mt-0 w-full md:w-auto transition-all duration-300 ease-in-out`}>
        
        <Link to="/" className="hover:text-white transition w-full md:w-auto py-1 md:py-0">Destination</Link>
        <Link to="#" className="hover:text-white transition w-full md:w-auto py-1 md:py-0">Aayam Royal Residences</Link>
        <Link to="#" className="hover:text-white transition w-full md:w-auto py-1 md:py-0">Aayam Club</Link>
        <Link to="#" className="hover:text-white transition w-full md:w-auto py-1 md:py-0">Aayam Curated</Link>
        <Link to="#" className="hover:text-white transition w-full md:w-auto py-1 md:py-0">Offers</Link>
        <Link to="#" className="hover:text-white transition w-full md:w-auto py-1 md:py-0">Notification</Link>
        <Link to="#" className="hover:text-white transition w-full md:w-auto py-1 md:py-0">About Us</Link>
        
        {/* ─── FIXED DYNAMIC LINK FOR USER AUTHENTICATION SYSTEM ─── */}
        <Link 
          to="/login" 
          onClick={() => setIsOpen(false)} // Mobile views par panel auto close karne ke liye
          className="bg-zinc-900 border border-zinc-800 text-[#E2B747] hover:bg-[#E2B747] hover:text-black hover:border-solid hover:shadow-[0_0_15px_rgba(226,183,71,0.25)] transition-all duration-300 px-6 py-2 md:py-1.5 rounded-xl font-bold tracking-wider text-xs text-center w-full md:w-auto mt-2 md:mt-0 uppercase"
        >
          Log-In
        </Link>
      </div>
      
    </nav>
  )
}

export default Header