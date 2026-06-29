import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Destination = () => {
  const [customDestination, setCustomDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ─── API FETCH: WORLD LOCATION AUTO-SUGGESTION ───
  useEffect(() => {
    // Agar input 3 letters se kam hai toh API hit nahi karenge optimization ke liye
    if (customDestination.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Free OpenStreetMap Geocoding API for global locations
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(customDestination)}&addressdetails=1&limit=5&featuretype=city,settlement`
        );
        if (response.ok) {
          const data = await response.json();
          // Extract clean city/country display name
          const mappedLocations = data.map(item => item.display_name);
          setSuggestions(mappedLocations);
        }
      } catch (error) {
        console.error("Location API Suggestion Offline:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400); // 400ms debounce taaki har ek keypress par faltu API hit na ho

    return () => clearTimeout(delayDebounceFn);
  }, [customDestination]);

  // Click outside listener to close dropdown overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── HANDLER: REDIRECT WITH STATE DATA ───
  const handleFindDestination = (e) => {
    e.preventDefault();
    if (!customDestination.trim()) {
      alert("Please enter or select a valid destination to proceed.");
      return;
    }
    
    navigate('/bookOrder', { 
      state: { chosenDestination: customDestination.trim() } 
    });
  };

  return (
    <div className="w-[85vw] mx-auto my-20 font-sans select-none relative z-40">
      <div className="flex flex-col lg:flex-row rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.25)] min-h-[450px]">
        
        {/* ─── LEFT SIDE: BRAND BLOCK ─── */}
        <div className="w-full lg:w-[55%] bg-gradient-to-br from-[#0f141d] via-[#151b26] to-[#0b0e14] p-10 md:p-14 flex flex-col justify-between relative rounded-t-[2.5rem] lg:rounded-tr-none lg:rounded-l-[2.5rem] overflow-hidden border-r border-gray-800/50">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#E2B747]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#E2B747] uppercase block mb-3">
              Bespoke Indian Hospitality
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif text-white font-normal tracking-wide leading-tight uppercase">
              Welcome To Aayam <br />
              <span className="text-[#E2B747]">Regent LLP Group</span>
            </h2>
            <p className="text-sm text-gray-400 font-light mt-6 leading-relaxed max-w-lg">
              Experience curated Indian hospitality where tradition and modern luxury find perfect balance. We invite discerning global travelers to discover five-star comfort and unparalleled service in our extraordinary, culturally vibrant locations.
            </p>
          </div>

          <div className="mt-10 relative z-10">
            <Link 
              to="/about-us"
              className="inline-block px-8 py-3.5 bg-white text-black text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-[#E2B747] hover:text-black hover:shadow-[0_10px_30px_rgba(226,183,71,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              About Aayam
            </Link>
          </div>
        </div>

        {/* ─── RIGHT SIDE: FIND DESTINATION WITH LIVE WORLD SUGGESTIONS ─── */}
        <div className="w-full lg:w-[45%] bg-[#1c1d1f] p-10 md:p-14 flex flex-col justify-center relative rounded-b-[2.5rem] lg:rounded-bl-none lg:rounded-r-[2.5rem]">
          
          <form onSubmit={handleFindDestination} className="w-full max-w-md mx-auto relative space-y-6">
            <h3 className="text-2xl font-serif text-white tracking-wider font-normal text-center lg:text-left mb-4 uppercase">
              Find Destination
            </h3>

            {/* Input & Floating Dropdown Box Frame */}
            <div className="relative" ref={dropdownRef}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                {isLoading ? (
                  // Smooth CSS Loader spinner jab search chal raha ho
                  <div className="w-4 h-4 border-2 border-[#E2B747] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 1 10.5 3a7.5 7.5 0 0 1 7.5 7.5Z" />
                  </svg>
                )}
              </div>
              
              <input
                type="text"
                value={customDestination}
                onChange={(e) => {
                  setCustomDestination(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Type city or country (e.g., Paris, Dubai, Goa)..."
                className="w-full h-14 pl-12 pr-5 rounded-xl bg-zinc-900/80 border text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#E2B747] focus:shadow-[0_0_15px_rgba(226,183,71,0.15)] transition-all duration-300 border-zinc-700/60 font-light relative z-10"
              />

              {/* ─── DYNAMIC FLOATING SUGGESTIONS DROPDOWN ─── */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden z-[999] max-h-60 overflow-y-auto">
                  <div className="py-1">
                    {suggestions.map((place, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => {
                          setCustomDestination(place);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-5 py-3.5 text-xs text-gray-300 hover:bg-[#E2B747]/10 hover:text-[#E2B747] border-b border-zinc-800/40 last:border-none transition-colors duration-200 block truncate"
                      >
                        {place}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Submit */}
            <button
              type="submit"
              className="w-full h-12 bg-[#E2B747] hover:bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              Search & Book Stay →
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default Destination;