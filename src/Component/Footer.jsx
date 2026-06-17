import React from 'react'
import Insta from '../assets/Insta.png'
import Whatsapp from '../assets/whatsapp.png'
import Facebook from '../assets/Facebook.png'
import X from '../assets/X_logo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    /* CRITICAL FIX: Background aur min-height ko layout frame ke sath stretchable banaya hai */
    <footer 
      className="w-full min-h-[350px] bg-cover bg-center relative mt-auto text-white select-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url("https://images.unsplash.com/photo-1777703304183-12e3a3f2eae9?q=80&w=1932&auto=format&fit=crop")'
      }}
    >
      {/* Container wrapper using normal paddings - Ab koi content background se bahar leak nahi hoga */}
      <div className="w-full px-[7.5vw] py-16 flex flex-col md:flex-row justify-between gap-12 items-stretch">
        
        {/* ─── LEFT BLOCK: Brand Identity & Social Icons ─── */}
        <div className="flex flex-col justify-between gap-8 md:min-h-[220px]">
          <div>
            <h2 className="text-2xl font-serif text-[#E2B747] tracking-wider mb-3">
              AAYAM REGENT LLP
            </h2>
            <p className="text-xs text-gray-400 font-light max-w-[280px] leading-relaxed">
              Experience the pinnacle of luxury residences, curated stays, and absolute comfort crafted just for you.
            </p>
          </div>

          <div>
            <div className="flex gap-4 mb-4">
              <a href="https://www.instagram.com/" target='_blank' rel="noreferrer" className="hover:scale-110 transition-transform duration-200">
                <img src={Insta} alt="Instagram" className='h-7 w-7 object-contain' />
              </a>
              <a href="https://web.whatsapp.com/" target='_blank' rel="noreferrer" className="hover:scale-110 transition-transform duration-200">
                <img src={Whatsapp} alt="WhatsApp" className='h-7 w-7 object-contain' />
              </a>
              <a href="https://www.facebook.com/" target='_blank' rel="noreferrer" className="hover:scale-110 transition-transform duration-200">
                <img src={Facebook} alt="Facebook" className='h-7 w-7 object-contain' />
              </a>
              <a href="http://x.com/" target='_blank' rel="noreferrer" className="hover:scale-110 transition-transform duration-200">
                <img src={X} alt="X Twitter" className='h-7 w-7 object-contain' />
              </a>
            </div>
            
            <p className="tracking-widest uppercase text-gray-500 text-[9px]">
              © 2026 Aayam Regent LLP. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* ─── RIGHT BLOCK: Links Grid & Staff Login Button ─── */}
        <div className="flex flex-col items-end gap-10 w-full md:w-auto justify-between md:min-h-[220px]">
          
          {/* Links Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-white w-full md:w-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-2.5 min-w-[120px]">
              <h4 className="text-xs uppercase tracking-widest text-[#E2B747] font-semibold mb-1">Quick Links</h4>
              <Link to="/" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Destination</Link>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Aayam Club</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Royal Residences</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Exclusive Offers</a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2.5 min-w-[120px]">
              <h4 className="text-xs uppercase tracking-widest text-[#E2B747] font-semibold mb-1">Discover</h4>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Weddings</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Spa & Wellness</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Experiences</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Gallery</a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-2.5 col-span-2 sm:col-span-1 min-w-[120px]">
              <h4 className="text-xs uppercase tracking-widest text-[#E2B747] font-semibold mb-1">Company</h4>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">About Us</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">News & Events</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Contact Support</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white font-light transition-colors">Privacy Policy</a>
            </div>
          </div>

          {/* STAFF LOGIN BUTTON FRAME */}
          <div className="self-start md:self-end mt-4 md:mt-0">
            <Link 
              to="/staff-login" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-[#E2B747]/40 bg-[#E2B747]/5 backdrop-blur-md text-[11px] font-medium tracking-widest uppercase text-[#E2B747] shadow-sm hover:bg-[#E2B747] hover:text-black hover:border-solid hover:shadow-[0_0_20px_rgba(226,183,71,0.3)] transition-all duration-300 group cursor-pointer"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.8} 
                stroke="currentColor" 
                className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Staff Login
            </Link>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer;