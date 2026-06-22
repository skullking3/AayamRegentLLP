import React, { useState, useRef, useEffect } from 'react';

const destinationsList = [
  {
    category: "LUXURY HERITAGE",
    items: [
      { name: "Aayam Heritage Hotel - Udaipur", link: "/destination/udaipur" },
      { name: "Aayam Palatial Suites - Varanasi", link: "/destination/varanasi" }
    ]
  },
  {
    category: "SERENE RETREATS",
    items: [
      { name: "Aayam Mountain Retreat - Munnar", link: "/destination/munnar" },
      { name: "Aayam Wellness Villa - Rishikesh", link: "/destination/rishikesh" },
      { name: "Aayam Resort & Spa - Goa", link: "/destination/goa" }
    ]
  }
];

const WelcomeDestination = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const dropdownRef = useRef(null);

  // Auto-close overlay when user clicks outside anywhere
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    /* CRITICAL FIX: Base layout wrapper se overflow-hidden ko HATA DIYA hai taaki dropdown bahar float kare */
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
            <a 
              href="/about"
              className="inline-block px-8 py-3.5 bg-white text-black text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-[#E2B747] hover:text-black hover:shadow-[0_10px_30px_rgba(226,183,71,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              About Aayam
            </a>
          </div>
        </div>

        {/* ─── RIGHT SIDE: FIND DESTINATION WITH FIXED VISUAL OVERFLOW ─── */}
        {/* Is div se bhi overflow-hidden hataya hai */}
        <div className="w-full lg:w-[45%] bg-[#1c1d1f] p-10 md:p-14 flex flex-col justify-center relative rounded-b-[2.5rem] lg:rounded-bl-none lg:rounded-r-[2.5rem]">
          
          <div className="w-full max-w-md mx-auto relative">
            <h3 className="text-2xl font-serif text-white tracking-wider font-normal text-center lg:text-left mb-8 uppercase">
              Find Destination
            </h3>

            {/* Dropdown Frame Container */}
            <div className="relative" ref={dropdownRef}>
              
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-14 px-5 rounded-xl bg-zinc-900/80 border text-left flex items-center justify-between transition-all duration-300 ${
                  isOpen ? 'border-[#E2B747] shadow-[0_0_15px_rgba(226,183,71,0.15)]' : 'border-zinc-700/60'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-gray-500 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 1 10.5 3a7.5 7.5 0 0 1 7.5 7.5Z" />
                  </svg>
                  <span className={`text-sm truncate ${selectedDestination ? 'text-white font-medium' : 'text-gray-400'}`}>
                    {selectedDestination || "Search for your next Aayam destination..."}
                  </span>
                </div>
                
                <svg 
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" 
                  className={`w-4 h-4 text-[#E2B747] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* ─── FLOATING OVERLAY LIST (DROPS OUTSIDE THE COMPONENT) ─── */}
              {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden z-[999] max-h-64 overflow-y-auto scrollbar-none">
                  {destinationsList.map((group, idx) => (
                    <div key={idx} className="border-b border-zinc-800/40 last:border-none">
                      
                      <div className="bg-zinc-950/60 px-4 py-2 text-[10px] font-bold tracking-widest text-[#E2B747]/60 uppercase">
                        {group.category}
                      </div>
                      
                      <div className="py-1">
                        {group.items.map((item, itemIdx) => (
                          <button
                            type="button"
                            key={itemIdx}
                            onClick={() => {
                              setSelectedDestination(item.name);
                              setIsOpen(false);
                            }}
                            className="w-full text-left px-5 py-3 text-xs text-gray-300 hover:bg-[#E2B747]/10 hover:text-white transition-colors duration-200 block truncate"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WelcomeDestination;