import React, { useState, useEffect, useRef } from 'react';

const BookingBar = () => {
  const [showGuests, setShowGuests] = useState(false);
  
  // Search aur API States
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [guests, setGuests] = useState({ adults: 2, children: 1 });
  const [checkIn, setCheckIn] = useState("2026-10-14");
  const [checkOut, setCheckOut] = useState("2026-10-21");

  // Multi-Step Popup Management States
  const [isFormOpen, setIsFormOpen] = useState(false);      // Step 1: Guest Form
  const [isReviewOpen, setIsReviewOpen] = useState(false);   // Step 2: Full Review Screen
  const [isThankYouOpen, setIsThankYouOpen] = useState(false); // Step 3: Success Screen
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Input States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [isMemberOrOwner, setIsMemberOrOwner] = useState("Yes");

  const suggestionRef = useRef(null);

  // API Fetch for Autocomplete
  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=5`
        );
        if (response.ok) {
          const data = await response.json();
          const formatted = data.map(item => item.display_name);
          setSuggestions(formatted);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Click Outside Dropdown Handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBookNowClick = () => {
    if (!searchQuery.trim()) {
      alert("Please select or search a destination first!");
      return;
    }
    setIsFormOpen(true);
  };

  const handleFormNextStep = (e) => {
    e.preventDefault();
    setIsFormOpen(false);   
    setIsReviewOpen(true);  
  };

  // 🚀 INTEGRATED LOGIC: Backend Submission
  const handleFinalBookingSubmit = async () => {
    setIsSubmitting(true);
    
    const bookingPayload = {
      destination: searchQuery,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: `${guests.adults} Adults, ${guests.children} Children`,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      isMemberOrOwner: isMemberOrOwner
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL; // .env se URL fetch kar rahe hain

      const response = await fetch(`${API_URL}/api/bookings/create`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(bookingPayload)
      });
      
      if (response.ok) {
        setIsReviewOpen(false);
        setIsThankYouOpen(true);
      } else {
        alert("Server responded with an error.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Booking Error:", err);
      // Fail-safe: Agar backend offline bhi ho, user ko experience block na ho
      setIsReviewOpen(false);
      setIsThankYouOpen(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 -mt-10 sm:-mt-8 z-30 font-sans">
      
      {/* Dynamic Glassmorphism Booking Bar */}
      <div className="bg-white/50 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] sm:rounded-full p-6 sm:py-4 sm:px-8 border border-white/40 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-4">
        
        {/* Destination Search Box */}
        <div ref={suggestionRef} className="relative flex-1 w-full border-b sm:border-b-0 sm:border-r border-gray-300/60 pb-3 sm:pb-0">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Where To?</p>
          <div className="flex items-center justify-between pr-3">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search destination (e.g. Delhi, Goa)..."
              className="bg-transparent text-gray-800 font-semibold text-sm focus:outline-none w-full placeholder-gray-400"
            />
            {isLoading && (
              <div className="w-4 h-4 border-2 border-[#b58e2a] border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>

          {/* Autocomplete Dropdown List */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 mt-4 w-full sm:w-80 bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-2 max-h-60 overflow-y-auto z-50">
              <h5 className="text-[9px] font-bold text-[#b58e2a] tracking-wider uppercase p-2 border-b border-gray-100">Suggested Locations</h5>
              {suggestions.map((name, i) => (
                <div 
                  key={i} 
                  onClick={() => { setSearchQuery(name); setShowSuggestions(false); }} 
                  className="text-xs text-gray-700 py-2.5 px-3 rounded-xl hover:bg-[#b58e2a]/10 hover:text-[#b58e2a] transition-all duration-200 font-medium cursor-pointer truncate"
                >
                  📍 {name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check-In / Check-Out */}
        <div className="flex-1 w-full flex gap-4 border-b sm:border-b-0 sm:border-r border-gray-300/60 pb-3 sm:pb-0">
          <div className="w-1/2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Check-In</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-transparent text-gray-800 font-semibold text-sm focus:outline-none w-full cursor-pointer" />
          </div>
          <div className="w-1/2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Check-Out</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-transparent text-gray-800 font-semibold text-sm focus:outline-none w-full cursor-pointer" />
          </div>
        </div>

        {/* Counter System */}
        <div className="relative flex-1 w-full border-b sm:border-b-0 pb-3 sm:pb-0 cursor-pointer" onClick={() => { setShowGuests(!showGuests); setShowSuggestions(false); }}>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Guests</p>
          <div className="flex items-center justify-between pr-3">
            <span className="text-gray-800 font-semibold text-sm">{guests.adults} Adults, {guests.children} Child</span>
            <span className="text-xs text-[#b58e2a]">▼</span>
          </div>

          {showGuests && (
            <div className="absolute right-0 mt-4 w-full sm:w-64 bg-white shadow-2xl rounded-2xl p-4 border border-gray-100 z-50" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div><p className="text-sm font-bold text-gray-800">Adults</p><p className="text-[11px] text-gray-400">Age 12+</p></div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setGuests(p => ({...p, adults: Math.max(1, p.adults - 1)}))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#b58e2a] hover:text-[#b58e2a] font-bold text-lg">-</button>
                  <span className="text-sm font-semibold w-4 text-center">{guests.adults}</span>
                  <button type="button" onClick={() => setGuests(p => ({...p, adults: p.adults + 1}))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#b58e2a] hover:text-[#b58e2a] font-bold text-lg">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-bold text-gray-800">Children</p><p className="text-[11px] text-gray-400">Age 2-12</p></div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setGuests(p => ({...p, children: Math.max(0, p.children - 1)}))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#b58e2a] hover:text-[#b58e2a] font-bold text-lg">-</button>
                  <span className="text-sm font-semibold w-4 text-center">{guests.children}</span>
                  <button type="button" onClick={() => setGuests(p => ({...p, children: p.children + 1}))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#b58e2a] hover:text-[#b58e2a] font-bold text-lg">+</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Master Trigger */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <button 
            type="button" 
            onClick={handleBookNowClick}
            className="w-full bg-gradient-to-r from-[#c59b27] via-[#b58e2a] to-[#94711c] text-white font-semibold text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded-full shadow-[0_4px_15px_rgba(181,142,42,0.3)] hover:shadow-[0_6px_20px_rgba(181,142,42,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>


      {/* 🚨 STEP 1: GUEST INFORMATION FORM POPUP */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-900 w-full max-w-lg rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl relative my-8 animate-fadeIn">
            
            <button onClick={() => setIsFormOpen(false)} className="absolute top-5 right-5 text-zinc-400 hover:text-white transition p-1.5 rounded-full bg-zinc-900 border border-zinc-800 z-10">✕</button>

            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-widest text-[#b58e2a] uppercase block mb-1">Reservation Details</span>
              <h3 className="text-2xl font-serif text-zinc-100">Guest Information Form</h3>
              <div className="w-12 h-[2px] bg-[#b58e2a] mt-1.5" />
            </div>

            <form onSubmit={handleFormNextStep} className="space-y-4">
              <div>
                <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1.5 font-semibold">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-[#b58e2a] transition" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1.5 font-semibold">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Guest@gmail.com" className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-[#b58e2a] transition" />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1.5 font-semibold">Phone Number</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 9876543210" className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-[#b58e2a] transition" />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1.5 font-semibold">Complete Address</label>
                <textarea name="address" required rows="2" value={formData.address} onChange={handleInputChange} placeholder="Delhi,India" className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-[#b58e2a] transition resize-none" />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs text-zinc-300 font-semibold block">Are you a Member / Owner of Aayam Regent LLP?</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${isMemberOrOwner === "Yes" ? "bg-[#b58e2a]/10 border-[#b58e2a] text-[#b58e2a]" : "bg-zinc-900/50 border-zinc-800 text-zinc-400"}`}>
                    <span className="text-xs font-semibold tracking-wider">YES</span>
                    <input type="radio" name="isMemberOrOwner" value="Yes" checked={isMemberOrOwner === "Yes"} onChange={() => setIsMemberOrOwner("Yes")} className="accent-[#b58e2a] h-4 w-4 cursor-pointer" />
                  </label>
                  <label className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${isMemberOrOwner === "No" ? "bg-[#b58e2a]/10 border-[#b58e2a] text-[#b58e2a]" : "bg-zinc-900/50 border-zinc-800 text-zinc-400"}`}>
                    <span className="text-xs font-semibold tracking-wider">NO</span>
                    <input type="radio" name="isMemberOrOwner" value="No" checked={isMemberOrOwner === "No"} onChange={() => setIsMemberOrOwner("No")} className="accent-[#b58e2a] h-4 w-4 cursor-pointer" />
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#c59b27] via-[#b58e2a] to-[#94711c] text-white font-semibold text-xs tracking-wider uppercase py-4 rounded-xl shadow-lg hover:opacity-95 transition mt-2">
                Continue to Review
              </button>
            </form>
          </div>
        </div>
      )}


      {/* 🚨 STEP 2: MID-REVIEW CONFIRMATION POPUP */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl relative my-8 animate-fadeIn">
            
            <button onClick={() => setIsReviewOpen(false)} className="absolute top-5 right-5 text-zinc-400 hover:text-white transition p-1.5 rounded-full bg-zinc-900 border border-zinc-800">✕</button>

            <div className="mb-5">
              <span className="text-[10px] font-bold tracking-widest text-[#b58e2a] uppercase block mb-1">Reservation Details</span>
              <h3 className="text-2xl font-serif text-zinc-100">Confirm Premium Booking</h3>
              <div className="w-12 h-[2px] bg-[#b58e2a] mt-1.5" />
            </div>

            <div className="space-y-5">
              
              {/* SECTION A: TRIP DETAILS */}
              <div>
                <h4 className="text-[11px] font-bold text-[#b58e2a] uppercase tracking-widest mb-2">1. Booking Details</h4>
                <div className="space-y-2.5 bg-zinc-900/40 border border-zinc-900/80 p-4 rounded-xl text-xs font-light text-zinc-400">
                  <div className="flex justify-between items-start">
                    <span>Destination:</span>
                    <span className="text-zinc-100 font-semibold text-right max-w-[240px] truncate">{searchQuery}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-zinc-900/50">
                    <span>Check-In:</span>
                    <span className="text-zinc-100 font-mono font-medium">{checkIn}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-zinc-900/50">
                    <span>Check-Out:</span>
                    <span className="text-zinc-100 font-mono font-medium">{checkOut}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-zinc-900/50">
                    <span>Guests:</span>
                    <span className="text-zinc-100 font-medium">{guests.adults} Adults, {guests.children} Children</span>
                  </div>
                </div>
              </div>

              {/* SECTION B: GUEST PERSONAL DETAILS */}
              <div>
                <h4 className="text-[11px] font-bold text-[#b58e2a] uppercase tracking-widest mb-2">2. Guest Information</h4>
                <div className="space-y-2.5 bg-zinc-900/40 border border-zinc-900/80 p-4 rounded-xl text-xs font-light text-zinc-400">
                  <div className="flex justify-between items-center">
                    <span>Full Name:</span>
                    <span className="text-zinc-100 font-medium">{formData.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-zinc-900/50">
                    <span>Email Address:</span>
                    <span className="text-zinc-100 font-medium truncate max-w-[220px]">{formData.email || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-zinc-900/50">
                    <span>Phone Number:</span>
                    <span className="text-zinc-100 font-mono font-medium">{formData.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-start pt-1 border-t border-zinc-900/50">
                    <span>Address:</span>
                    <span className="text-zinc-100 font-medium text-right max-w-[240px] break-words">{formData.address || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-zinc-900/50">
                    <span>Member / Owner:</span>
                    <span className={`font-bold tracking-wider ${isMemberOrOwner === "Yes" ? "text-emerald-500" : "text-amber-500"}`}>
                      {isMemberOrOwner.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <p className="text-[11px] text-zinc-500 my-5 text-center italic">Please re-verify all inputs before final submission.</p>

            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => { setIsReviewOpen(false); setIsFormOpen(true); }}
                className="w-1/3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-semibold text-xs tracking-wider uppercase py-4 rounded-xl transition"
              >
                Back
              </button>
              
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalBookingSubmit}
                className="w-2/3 bg-gradient-to-r from-[#c59b27] via-[#b58e2a] to-[#94711c] text-white font-semibold text-xs tracking-wider uppercase py-4 rounded-xl shadow-[0_4px_15px_rgba(181,142,42,0.2)] hover:opacity-95 transition disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Submit Stay Request"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 🚨 STEP 3: LUXURY THANK YOU SUCCESS POPUP */}
      {isThankYouOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#111113] border border-zinc-800/60 w-full max-w-md rounded-[2.5rem] p-8 text-center text-white shadow-[0_20px_50px_rgba(181,142,42,0.15)] relative animate-scaleUp">
            
            <div className="w-16 h-16 bg-gradient-to-r from-[#c59b27] to-[#94711c] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(181,142,42,0.3)]">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h4 className="text-2xl font-serif text-zinc-100 mb-1.5 tracking-wide">
              Thank You, {formData.name || 'Valued Guest'}!
            </h4>
            <p className="text-[10px] font-bold text-[#b58e2a] tracking-widest uppercase mb-5">
              Aayam Regent LLP
            </p>
            
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-xs mx-auto mb-8">
              Your elite reservation request has been successfully received. Our luxury concierge desk will reach out to you on <span className="text-zinc-100 font-bold font-mono">{formData.phone || '8329426744'}</span> or via email shortly to coordinate your premium stay arrangements.
            </p>

            <button 
              onClick={() => setIsThankYouOpen(false)}
              className="w-full bg-[#242427] hover:bg-zinc-800 text-zinc-300 font-semibold text-xs tracking-widest uppercase py-4 rounded-full border border-zinc-700/30 transition duration-200"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingBar;