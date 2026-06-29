import React, { useState, useEffect, useRef } from 'react';

const OffersSection = () => {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Touch gestures ke liye refs (Mobile Swipe feature)
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // 1. Backend API se Offers data fetch karna
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/public/offers`); // Aapka admin panel offers endpoint
        if (response.ok) {
          const data = await response.json();
          setOffers(data);
        } else {
          throw new Error("Failed to fetch offers");
        }
      } catch (error) {
        console.error("Error loading offers from admin panel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [BASE_URL]);

  // 2. Auto-Play Logic (Har 2-3 seconds me automatically agla card dikhane ke liye)
  useEffect(() => {
    if (offers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === offers.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds interval (Smooth user reading experience ke liye 3s best hai, aap isse 2000 bhi kar sakte hain)

    return () => clearInterval(interval);
  }, [offers]);

  // 3. Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (offers.length <= 1) return;
    
    const diff = touchStartX.current - touchEndX.current;
    
    // Swipe Left -> Next Card
    if (diff > 50) {
      setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    }
    // Swipe Right -> Previous Card
    if (diff < -50) {
      setCurrentIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
    }
  };

  if (loading) {
    return (
      <div className="w-[85vw] mx-auto my-20 flex justify-center items-center h-48">
        <div className="animate-spin h-8 w-8 stroke-[#E2B747] border-4 border-[#E2B747]/20 border-t-[#E2B747] rounded-full"></div>
      </div>
    );
  }

  if (offers.length === 0) return null;

  return (
    <div 
      id="offers-section"
      className="w-[90vw] md:w-[85vw] xl:w-[80vw] mx-auto my-16 bg-zinc-950/40 backdrop-blur-md border border-zinc-900/60 rounded-[2.5rem] p-6 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Top Header Area */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-2">
          Handpicked For You
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white font-normal tracking-wider relative inline-block uppercase">
          Offers
          <span className="absolute bottom-[-8px] left-0 md:left-0 right-0 md:right-auto mx-auto md:mx-0 w-12 h-[2px] bg-[#E2B747]"></span>
        </h2>
      </div>

      {/* 📱 MOBILE VIEW SLIDER (Shows 1 card at a time with smooth transition and Touch Swipe) */}
      <div className="block md:hidden">
        <div 
          className="relative w-full overflow-hidden min-h-[380px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {offers.map((item, index) => (
            <div
              key={item.id}
              className={`absolute w-full max-w-[310px] min-h-[350px] bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 translate-x-0 pointer-events-auto scale-100' 
                  : 'opacity-0 translate-x-full pointer-events-none scale-95'
              }`}
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#E2B747] font-bold mb-2">
                  {item.tag}
                </p>
                <h3 className="text-xl font-serif text-white font-normal tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <button className="w-full bg-zinc-900 text-white text-[10px] font-bold tracking-widest uppercase py-3.5 rounded-xl border border-zinc-800 active:bg-[#E2B747] active:text-black transition-all">
                {item.btnText || "Explore More"}
              </button>
            </div>
          ))}
        </div>

        {/* Dynamic Dot Indicators for Mobile */}
        <div className="flex justify-center gap-2 mt-4">
          {offers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-[#E2B747]' : 'w-1.5 bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 💻 DESKTOP GRID VIEW (Baaki bade screens par waisa hi solid aur uniform 4-column ya 2-column premium look dikhega) */}
      <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
        {offers.map((item) => (
          <div 
            key={item.id} 
            className="w-full max-w-[320px] min-h-[360px] bg-zinc-950/90 border border-zinc-900 rounded-2xl p-6 shadow-2xl hover:shadow-[0_0_25px_rgba(226,183,71,0.08)] hover:border-[#E2B747]/40 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#E2B747] font-bold mb-2">
                {item.tag}
              </p>
              <h3 className="text-xl font-serif text-white font-normal group-hover:text-[#E2B747] transition-colors duration-300 tracking-wide">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>

            <button className="w-full bg-zinc-900 text-white text-[10px] font-bold tracking-widest uppercase py-3.5 rounded-xl border border-zinc-800 hover:bg-[#E2B747] hover:text-black hover:border-transparent transition-all duration-300 mt-6">
              {item.btnText || "Explore More"}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default OffersSection;