import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 1. Redirect karne ke liye import kiya

const BookingBar = () => {
  const navigate = useNavigate(); // 👈 2. Initialize kiya
  const [showResorts, setShowResorts] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [selectedResort, setSelectedResort] = useState("Aayam Resort Goa");
  const [guests, setGuests] = useState({ adults: 2, children: 1 });
  
  // 👈 3. Dates ko dynamic control karne ke liye state banayi
  const [checkIn, setCheckIn] = useState("2026-10-14");
  const [checkOut, setCheckOut] = useState("2026-10-21");

  const resortList = [
    { category: "Aayam Resorts", names: ["Aayam Resort Goa", "Aayam Kandara - Bali", "Aayam Bavaria - Germany"] },
    { category: "Aayam Retreats", names: ["Aayam Munnar - Kerala", "Aayam Royal Residences"] }
  ];

  // 👈 4. Core Core Booking Action Logic
  const handleBookingAction = async () => {
    // Check karo local storage me login session hai ya nahi
    const loggedInUser = localStorage.getItem('user');

    if (!loggedInUser) {
      alert("Please login first to reserve your premium stay!");
      navigate('/login'); // 🚨 Direct login page par bhej diya!
      return;
    }

    // Agar logged in hai, toh direct Java Backend hit karo
    const user = JSON.parse(loggedInUser);
    const bookingPayload = {
      userId: user.id, // MongoDB user custom id
      destination: selectedResort,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: `${guests.adults} Adults, ${guests.children} Children`
    };

    try {
      const response = await fetch('http://localhost:8080/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`🎉 Luxury Booking Confirmed for ${user.name}!\nBooking ID: ${data.id}`);
      } else {
        alert("Booking failed. Please check backend response.");
      }
    } catch (err) {
      alert("Backend Server Offline hai bhai!");
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 -mt-10 sm:-mt-8 z-30 font-sans select-none">
      <div className="bg-white/50 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] sm:rounded-full p-6 sm:py-4 sm:px-8 border border-white/40 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-4">
        
        {/* Destination Section */}
        <div className="relative flex-1 w-full border-b sm:border-b-0 sm:border-r border-gray-300/60 pb-3 sm:pb-0 cursor-pointer" onClick={() => { setShowResorts(!showResorts); setShowGuests(false); }}>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Where To?</p>
          <div className="flex items-center justify-between pr-3">
            <span className="text-gray-800 font-semibold text-sm">{selectedResort}</span>
            <span className={`text-xs text-[#b58e2a] transition-transform duration-300 ${showResorts ? 'rotate-180' : ''}`}>▼</span>
          </div>

          {showResorts && (
            <div className="absolute left-0 mt-4 w-full sm:w-72 bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-4 max-h-60 overflow-y-auto z-50 animate-fadeIn">
              {resortList.map((group, idx) => (
                <div key={idx} className="mb-3">
                  <h5 className="text-[10px] font-bold text-[#b58e2a] tracking-wider uppercase mb-1.5">{group.category}</h5>
                  {group.names.map((name, i) => (
                    <div key={i} onClick={(e) => { e.stopPropagation(); setSelectedResort(name); setShowResorts(false); }} className="text-sm text-gray-700 py-2 px-2.5 rounded-xl hover:bg-[#b58e2a]/10 hover:text-[#b58e2a] transition-all duration-200 font-medium">
                      {name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check-In / Check-Out Section */}
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

        {/* Guests Counter Section */}
        <div className="relative flex-1 w-full border-b sm:border-b-0 pb-3 sm:pb-0 cursor-pointer" onClick={() => { setShowGuests(!showGuests); setShowResorts(false); }}>
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

        {/* Luxury Book Now Button */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <button 
            type="button" 
            onClick={handleBookingAction} // 👈 Event Trigger mapped here
            className="w-full bg-gradient-to-r from-[#c59b27] via-[#b58e2a] to-[#94711c] text-white font-semibold text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded-full shadow-[0_4px_15px_rgba(181,142,42,0.3)] hover:shadow-[0_6px_20px_rgba(181,142,42,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingBar;