import React, { useState, useEffect, useRef } from 'react';

// 10 Premium Luxury Stays Data Array - Fixed with precise Unsplash High-End Location Pics
const propertiesData = [
  { 
    id: 1, 
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600", // Luxury Goa Beach Villa
    title: "Goa", 
    location: "India", 
    tag: "Premium Heritage Stay", 
    rating: "4.9", 
    category: "National" 
  },
  { 
    id: 2, 
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600", // Andalusian Courtyard Resort
    title: "Andalusia", 
    location: "Spain", 
    tag: "Luxury Coastal Escape", 
    rating: "4.8", 
    category: "International" 
  },
  { 
    id: 3, 
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600", // Paris Eiffel-View Boutique Hotel
    title: "Île-de-France (Paris)", 
    location: "France", 
    tag: "Boutique Urban Hideaway", 
    rating: "4.5", 
    category: "International" 
  },
  { 
    id: 4, 
    img: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=600", // Tuscan Luxury Villa, Florence
    title: "Tuscany (Florence)", 
    location: "Italy", 
    tag: "Exclusive Mansion Estate", 
    rating: "4.8", 
    category: "International" 
  },
  { 
    id: 5, 
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600", // Luxury Infinity Pool Sanctuary, Indonesia
    title: "Jakarta", 
    location: "Indonesia", 
    tag: "Tropical Elite Sanctuary", 
    rating: "4.6", 
    category: "International" 
  },
  { 
    id: 6, 
    img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600", // Canadian Snow-Crested Cabin Lodge
    title: "Northwest Territories", 
    location: "Canada", 
    tag: "Scenic Wilderness Resort", 
    rating: "4.9", 
    category: "International" 
  },
  { 
    id: 7, 
    img: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=600", // Pure Udaipur Palace Royal Lake View
    title: "Rajasthan (Udaipur)", 
    location: "India", 
    tag: "Royal Signature Suite", 
    rating: "5.0", 
    category: "National" 
  },
  { 
    id: 8, 
    img: "https://images.unsplash.com/photo-1521206644285-8db1549e484f?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Luxury Valley/Nature Resort India
    title: "Maharashtra", 
    location: "India", 
    tag: "Emerald Riviera Villa", 
    rating: "4.7", 
    category: "National" 
  },
  { 
    id: 9, 
    img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600", // Thailand Exotic Island Resort
    title: "Phuket", 
    location: "Thailand", 
    tag: "Whispering Palms Sanctuary", 
    rating: "4.8", 
    category: "International" 
  },
  { 
    id: 10, 
    img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600", // Swiss Alps Chalet, Zermatt
    title: "Valais (Zermatt)", 
    location: "Switzerland", 
    tag: "Alpina Crest Chalet", 
    rating: "4.9", 
    category: "International" 
  }
];

const PropertySlider = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sliderRef = useRef(null);

  // Filter Algorithm Logic
  const filteredProperties = propertiesData.filter(item => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  // Function to Slide Next
  const handleNext = () => {
    if (sliderRef.current && sliderRef.current.firstChild) {
      const cardWidth = sliderRef.current.firstChild.clientWidth + 24; 
      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      
      if (sliderRef.current.scrollLeft >= maxScroll - 5) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: cardWidth * 1.5, behavior: 'smooth' }); 
      }
    }
  };

  // Function to Slide Prev
  const handlePrev = () => {
    if (sliderRef.current && sliderRef.current.firstChild) {
      const cardWidth = sliderRef.current.firstChild.clientWidth + 24;
      if (sliderRef.current.scrollLeft <= 5) {
        sliderRef.current.scrollTo({ left: sliderRef.current.scrollWidth, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: -cardWidth * 1.5, behavior: 'smooth' });
      }
    }
  };

  // 10 Seconds Auto Slider Effect
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(timer);
  }, [activeFilter]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 my-12 md:my-20 font-sans relative">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-serif text-white tracking-wide">
          Where Comfort Meets Convenience
        </h2>
        <div className="w-16 h-[2px] bg-[#b58e2a] mx-auto mt-3 mb-2" />
        <p className="text-zinc-400 text-xs md:text-sm font-light max-w-md mx-auto">
          Discover handpicked premium stays tailored perfectly across top domestic and global horizons.
        </p>
      </div>

      {/* NATIONAL / INTERNATIONAL FILTER ROW */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-zinc-800/80 pb-4">
        
        {/* National/International Tabs */}
        <div className="flex items-center gap-3 w-full sm:w-auto py-1">
          {[
            { label: 'All Horizons', value: 'All' },
            { label: 'National Stays', value: 'National' },
            { label: 'International Escapes', value: 'International' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap border ${
                activeFilter === tab.value 
                  ? 'bg-gradient-to-r from-[#c59b27] to-[#94711c] text-white border-transparent shadow-lg scale-[1.02]' 
                  : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Manual Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-400 hover:border-[#b58e2a] hover:text-[#b58e2a] transition-all duration-300 shadow-md backdrop-blur-sm"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950/40 flex items-center justify-center text-zinc-400 hover:border-[#b58e2a] hover:text-[#b58e2a] transition-all duration-300 shadow-md backdrop-blur-sm"
          >
            →
          </button>
        </div>
      </div>

      {/* DYNAMIC SCROLL CONTAINER */}
      {filteredProperties.length > 0 ? (
        <div 
          ref={sliderRef}
          className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth py-2 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} 
        >
          {filteredProperties.map((item) => (
            
            /* Single Premium Card */
            <div 
              key={item.id}
              className="min-w-[260px] sm:min-w-[310px] md:min-w-[330px] max-w-[340px] bg-zinc-950/80 border border-zinc-900 rounded-[2rem] overflow-hidden shadow-xl hover:border-zinc-800/80 transition-all duration-300 group snap-start flex-shrink-0 flex flex-col justify-between"
            >
              {/* Image Block */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
              </div>

              {/* Descriptions Block */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg text-zinc-100 truncate group-hover:text-[#b58e2a] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#b58e2a] bg-[#b58e2a]/10 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 mt-0.5">
                      ★ {item.rating}
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-500 font-medium tracking-wide mt-1 flex items-center gap-1">
                    📍 {item.location}
                  </p>
                </div>

                {/* Bottom Segment Elements */}
                <div className="mt-5 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  
                  <button className="text-xs font-bold text-[#b58e2a] tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                    Explore <span>→</span>
                  </button>
                </div>

              </div>
            </div>

          ))}
        </div>
      ) : (
        /* Empty Fallback State */
        <div className="text-center py-12 text-zinc-500 text-sm">
          No premium properties available for this category selection.
        </div>
      )}

    </div>
  );
};

export default PropertySlider;