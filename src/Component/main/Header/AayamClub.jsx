import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AayamClub = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // 👤 Real Dynamic User Profiles State
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal aur Controlling UI States
  const [selectedTier, setSelectedTier] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [liveTiers, setLiveTiers] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const uiStyles = {
    "Elite Silver": { accent: "border-zinc-700/60", buttonBg: "bg-zinc-900 text-white hover:bg-white hover:text-black" },
    "Royal Gold": { accent: "border-[#E2B747]/60 shadow-[0_0_30px_rgba(226,183,71,0.1)]", buttonBg: "bg-[#E2B747] text-black hover:bg-white" },
    "Imperial Platinum": { accent: "border-purple-900/40", buttonBg: "bg-purple-900 text-white hover:bg-[#E2B747] hover:text-black" }
  };

  // 🔄 1. Get Logged-In User Details from DB on Mount
  useEffect(() => {
  const checkUserSession = async () => {
    // 🔥 FIX: Aap jis key se localStorage me user login data ya ID rakhte hain, use yahan read karein.
    // Agar puri user object saved hai toh localUser.id nikalna, agar sirf string ID hai toh direct use karna.
    const savedUser = localStorage.getItem("user"); 
    let loggedInUserId = null;

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        loggedInUserId = parsedUser.id || parsedUser._id; // id nikal li
      } catch (e) {
        loggedInUserId = savedUser; // agar direct string id saved hai toh
      }
    }

    // Agar ID mil gayi, toh backend se fresh profile data pull karo
    if (loggedInUserId) {
      try {
        const res = await fetch(`${BASE_URL}/api/club/user/${loggedInUserId}`);
        if (res.ok) {
          const userData = await res.json();
          setCurrentUser(userData);
          setIsLoggedIn(true); // 🔥 Ab state true hogi, warning nahi aayegi!
        }
      } catch (err) {
        console.error("Error fetching logged-in user profile:", err);
      }
    }
  };

    const getLiveClubData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/public/club`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setLiveTiers(data);
        }
      } catch (err) { console.error("Club API offline:", err); }
    };

    checkUserSession();
    getLiveClubData();
  }, []);

  // Handle Invitation Trigger Button
  const handleRequestClick = (tier) => {
    if (!isLoggedIn || !currentUser) {
      setLoginAlert(true);
      setTimeout(() => setLoginAlert(false), 4000);
      return;
    }
    setSelectedTier(tier);
    setShowPreviewModal(true);
  };

  // Final submit handler to database
  const handleFinalSubmit = async () => {
    setSubmitting(true);
    const requestPayload = {
      userName: currentUser.name, 
      userEmail: currentUser.email, 
      userPhone: currentUser.phone, 
      selectedTier: selectedTier.name,
      pricingTier: selectedTier.price
    };

    try {
          const response = await fetch(`${BASE_URL}/api/club/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload)
      });
      if (response.ok) {
        setShowPreviewModal(false);
        setShowThankYouModal(true);
      } else {
        alert("Server error while processing your request.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network Error! Backend connection offline.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0e14] text-white py-12 md:py-20 px-4 md:px-12 select-none relative overflow-hidden">
      
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#E2B747]/5 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#E2B747]/5 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />

      {/* Login State Alert Toast */}
      {loginAlert && (
        <div className="fixed bottom-5 right-5 z-50 bg-red-950/90 border border-red-800 text-red-200 px-5 py-3.5 rounded-2xl text-xs font-bold tracking-wide shadow-2xl animate-pulse flex items-center space-x-2">
          <span>⚠️</span> <span>Please login first to request an invitation!</span>
        </div>
      )}

      {/* Header Branding */}
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20 relative z-10">
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.5em] text-[#E2B747] uppercase block mb-3">Only apply on members</span>
        <h2 className="text-2xl md:text-5xl font-serif tracking-wider font-normal uppercase text-white">
          Club <span className="text-[#E2B747]">Aayam</span> Privileges
        </h2>
      </div>

      {/* Listing Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10 items-stretch mb-16 md:mb-20">
        {liveTiers.map((tier, index) => {
          const style = uiStyles[tier.name] || uiStyles["Elite Silver"];
          return (
            <div key={index} className={`bg-zinc-900/30 backdrop-blur-xl border ${style.accent} p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between group hover:scale-[1.01] transition-all duration-500`}>
              <div>
                <div className="border-b border-zinc-800/60 pb-5 mb-5">
                  <h3 className="text-lg md:text-xl font-serif tracking-wide text-white group-hover:text-[#E2B747] transition-colors">{tier.name}</h3>
                  <p className="text-xl md:text-2xl font-mono text-[#E2B747] font-semibold mt-1.5">{tier.price}</p>
                </div>
                <ul className="space-y-3.5 mb-6 md:mb-8">
                  {tier.features && tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[11px] md:text-xs text-gray-400 font-light leading-relaxed">
                      <span className="text-[#E2B747] text-xs mt-0.5">✦</span> <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => handleRequestClick(tier)}
                className={`w-full h-11 md:h-12 rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${style.buttonBg}`}
              >
                Request Invitation
              </button>
            </div>
          );
        })}
      </div>

      {/* 📥 POPUP MODAL 1: PREVIEW PROFILE DETAILS (Fully Mobile Responsive) */}
      {showPreviewModal && selectedTier && currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="bg-zinc-950 border border-zinc-800 p-5 sm:p-8 rounded-[2rem] max-w-md w-full shadow-2xl relative space-y-5 my-auto max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowPreviewModal(false)} className="absolute top-5 right-5 text-zinc-500 hover:text-white transition text-sm p-1">✕</button>
              
              <div className="text-center">
                  <span className="text-[9px] font-bold text-[#E2B747] tracking-[0.3em] uppercase">Bespoke Verification</span>
                  <h3 className="text-lg font-serif mt-1">Application Preview</h3>
              </div>

              {/* Data Content Box dynamically populated from user database schema */}
              <div className="bg-zinc-900/50 border border-zinc-900 p-4 rounded-2xl space-y-3 text-xs">
                  <div className="flex justify-between border-b border-zinc-800/50 pb-2"><span className="text-zinc-500">Selected Tier:</span><span className="font-bold text-[#E2B747]">{selectedTier.name}</span></div>
                  <div className="flex justify-between border-b border-zinc-800/50 pb-2"><span className="text-zinc-500">Value Pricing:</span><span className="font-mono text-zinc-300">{selectedTier.price}</span></div>
                  <div className="flex justify-between border-b border-zinc-800/50 pb-2"><span className="text-zinc-500">Full Name:</span><span className="text-white font-medium">{currentUser.name}</span></div>
                  <div className="flex justify-between border-b border-zinc-800/50 pb-2"><span className="text-zinc-500">Email Address:</span><span className="text-white font-medium break-all">{currentUser.email}</span></div>
                  <div className="flex justify-between pb-1"><span className="text-zinc-500">Phone Vector:</span><span className="text-white font-medium">{currentUser.phone}</span></div>
              </div>

              <p className="text-[10px] text-zinc-500 text-center leading-relaxed">By submitting, you authorize Aayam Desks to process profile checks for elite allocation privileges.</p>

              <button 
                onClick={handleFinalSubmit}
                disabled={submitting}
                className="w-full bg-[#E2B747] hover:bg-[#cdaf3f] text-black h-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Processing..." : "Confirm & Send Application →"}
              </button>
          </div>
        </div>
      )}

      {/* 📥 POPUP MODAL 2: THANK YOU SUCCESS CELEBRATION */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
          <div className="bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl space-y-4 my-auto">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto border border-emerald-500/20">✓</div>
              <h3 className="text-xl font-serif text-white uppercase tracking-wider">Application Received</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Thank you for registering your interest with Club Aayam. Our private desk relations team will review your credentials and contact you shortly.
              </p>
              <button 
                onClick={() => setShowThankYouModal(false)}
                className="w-full bg-zinc-900 hover:bg-white hover:text-black border border-zinc-800 text-white h-11 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer mt-2"
              >
                Close Desk View
              </button>
          </div>
        </div>
      )}

      {/* Bottom Banner */}
      <div className="max-w-5xl mx-auto bg-zinc-950/80 border border-zinc-900 rounded-[2rem] p-6 md:p-12 text-center relative z-10 backdrop-blur-md">
        <h4 className="text-sm md:text-xl font-serif tracking-wider text-white mb-2.5">
          LOOKING FOR CUSTOM CORPORATE MEMBERSHIPS?
        </h4> 
        <Link 
          to="/about-us" 
          className="inline-block text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-[#E2B747] border-b border-dashed border-[#E2B747]/50 pb-1 transition-colors"
        >
          Connect With Our Desk →
        </Link>
      </div>
    </div>
  );
};

export default AayamClub;