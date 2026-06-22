import React, { useState, useEffect } from 'react';

const Location = () => {
  const [activeTab, setActiveTab] = useState('all'); // all, national, international

  // 🚨 FIXED: Jab bhi naya page mount ho, scroll position default top (0,0) par reset ho jaye
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const destinationData = [
    // --- National Locations (India) ---
    { id: 1, name: "Rajasthan", country: "India", type: "national", tag: "Royal Heritage", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Mumbai", country: "India", type: "national", tag: "The City of Dreams", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Goa", country: "India", type: "national", tag: "Bespoke Beaches", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Kerala", country: "India", type: "national", tag: "Serene Backwaters", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Agra", country: "India", type: "national", tag: "Monumental Luxury", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Udaipur", country: "India", type: "national", tag: "The Lake City", image: "https://images.unsplash.com/photo-1591263116407-32d79075734e?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Varanasi", country: "India", type: "national", tag: "Spiritual Essence", image: "https://images.unsplash.com/photo-1561361531-9952a7879303?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Manali", country: "India", type: "national", tag: "Snowy Retreats", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80" },
    { id: 9, name: "Leh Ladakh", country: "India", type: "national", tag: "Mystic Mountains", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80" },
    { id: 10, name: "Rishikesh", country: "India", type: "national", tag: "Yoga & Adventure", image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=600&q=80" },
    { id: 11, name: "Darjeeling", country: "India", type: "national", tag: "Imperial Tea Estates", image: "https://images.unsplash.com/photo-1555243952-6b3a0a65fa63?auto=format&fit=crop&w=600&q=80" },
    { id: 12, name: "Jaipur", country: "India", type: "national", tag: "The Pink Palace", image: "https://images.unsplash.com/photo-1477584322813-ac040152345a?auto=format&fit=crop&w=600&q=80" },
    { id: 13, name: "Andaman & Nicobar", country: "India", type: "national", tag: "Exotic Islands", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80" },

    // --- International Locations ---
    { id: 14, name: "New York", country: "USA", type: "international", tag: "The Manhattan Suite", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80" },
    { id: 15, name: "Paris", country: "France", type: "international", tag: "Romance & Art", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
    { id: 16, name: "Dubai", country: "UAE", type: "international", tag: "Oasis of Modernity", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" },
    { id: 17, name: "London", country: "UK", type: "international", tag: "The Crown Estate", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" },
    { id: 18, name: "Tokyo", country: "Japan", type: "international", tag: "Neon & Tradition", image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=600&q=80" },
    { id: 19, name: "Maldives", country: "Republic of Maldives", type: "international", tag: "Overwater Villas", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80" },
    { id: 20, name: "Bali", country: "Indonesia", type: "international", tag: "Tropical Sanctuaries", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" },
    { id: 21, name: "Rome", country: "Italy", type: "international", tag: "The Eternal Heritage", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" },
    { id: 22, name: "Singapore", country: "Singapore", type: "international", tag: "Futuristic Eden", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80" },
    { id: 23, name: "Sydney", country: "Australia", type: "international", tag: "Harbor Luxury", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" },
    { id: 24, name: "Cape Town", country: "South Africa", type: "international", tag: "Coastal Elegance", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=600&q=80" },
    { id: 25, name: "Bangkok", country: "Thailand", type: "international", tag: "Vibrant Culture", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80" },
    { id: 26, name: "Zurich", country: "Switzerland", type: "international", tag: "Alpine Exclusivity", image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=600&q=80" }
  ];

  const filteredDestinations = destinationData.filter(dest => {
    if (activeTab === 'all') return true;
    return dest.type === activeTab;
  });

  return (
    <div className="w-full min-h-screen bg-[#0b0e14] text-white py-20 px-4 md:px-12 select-none relative overflow-hidden">
      
      {/* Background Ambient Aesthetics */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E2B747]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E2B747]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Heading Group */}
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-3">
          Aayam Global Footprint
        </span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-wider font-normal uppercase text-white">
          Our Luxury <span className="text-[#E2B747]">Destinations</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-500 font-light mt-4 max-w-xl mx-auto leading-relaxed">
          Explore our handpicked curation of 25+ iconic getaways across domestic borders and international skylines.
        </p>

        {/* Dynamic Category Navigation Tabs */}
        <div className="flex justify-center items-center gap-2 mt-10 max-w-md mx-auto bg-zinc-950/80 p-1.5 rounded-2xl border border-zinc-900/60 backdrop-blur-md">
          {['all', 'national', 'international'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-[#E2B747] text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              {tab === 'all' ? 'All Portfolios' : tab === 'national' ? 'National' : 'International'}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Cards Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {filteredDestinations.map((dest) => (
          <div 
            key={dest.id}
            className="group relative h-80 rounded-[1.8rem] overflow-hidden border border-zinc-900 shadow-2xl bg-zinc-950 flex flex-col justify-end p-6 transition-all duration-500 hover:border-[#E2B747]/40 cursor-pointer"
          >
            {/* Smooth Zoom Backdrop Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-100 group-hover:scale-110"
              style={{ backgroundImage: `url(${dest.image})` }}
            />
            {/* Premium Dark Radial Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-90" />

            {/* Typography Content Meta */}
            <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[8px] font-bold tracking-widest text-[#E2B747] uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800/40 inline-block mb-3">
                {dest.tag}
              </span>
              <h4 className="text-xl font-serif text-white tracking-wide">
                {dest.name}
              </h4>
              <p className="text-[10px] text-gray-400 font-light tracking-widest uppercase mt-0.5">
                {dest.country}
              </p>
              
              {/* Expand Hidden Action on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 pt-3 border-t border-zinc-800/60 flex justify-between items-center">
                <span className="text-[9px] font-bold tracking-wider uppercase text-white">Explore Properties</span>
                <span className="text-[#E2B747] text-xs">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Location;