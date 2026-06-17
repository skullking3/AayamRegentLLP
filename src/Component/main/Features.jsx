import React from 'react';

const featuresData = [
  {
    id: 1,
    title: "Weddings",
    tagline: "Celebrate Your Eternal Love Story",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    link: "/weddings"
  },
  {
    id: 2,
    title: "News & Events",
    tagline: "Stay Updated with Aayam Happenings",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
    link: "/events"
  },
  {
    id: 3,
    title: "Aayam Club",
    tagline: "Unlocking Elite Privilege Membership",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
    link: "/aayam-club"
  },
  {
    id: 4,
    title: "Spa & Wellbeing",
    tagline: "Reinvigorate Your Mind, Body & Soul",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800",
    link: "/spa"
  },
  {
    id: 5,
    title: "Experiences",
    tagline: "Curated Bespoke Moments Crafted for You",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
    link: "/experiences"
  },
  {
    id: 6,
    title: "Gallery",
    tagline: "Visual Journey Through Aayam Landmarks",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
    link: "/gallery"
  }
];

const FeatureGrid = () => {
  return (
    <div className="w-[85vw] mx-auto my-24 font-sans select-none">
      
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#b58e2a] uppercase block mb-2">
          Discover Premium Luxury
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white font-normal tracking-wide">
          Our Offerings & Experiences
        </h2>
        <div className="w-12 h-[2px] bg-[#b58e2a] mx-auto mt-4"></div>
      </div>

      {/* LUXURY GRID WITH CUSTOM GAP-8 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {featuresData.map((feature) => (
          
          /* Link Wrapper Component - Act as the Mouse Enter Trigger Zone */
          <a 
            href={feature.link}
            key={feature.id}
            className="relative h-80 w-full rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-500 block border border-gray-200/10"
          >
            
            {/* 1. Background Image Layer */}
            <img 
              src={feature.img} 
              alt={feature.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* 2. Dynamic Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-all duration-300" />

            {/* 3. Text and Interactive Elements Area */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
              
              {/* Dynamic Golden Tagline Subtitle */}
              <span className="text-[10px] font-bold tracking-widest text-[#E2B747] uppercase mb-1 drop-shadow-sm">
                Aayam Exclusive
              </span>

              {/* Heading Title (Hamesha visible rahega, hover par color change hoga) */}
              <h3 className="text-3xl font-serif tracking-wide font-normal transition-colors duration-300 group-hover:text-[#E2B747]">
                {feature.title}
              </h3>
              
              {/* ─── HOVER REVEAL INNER CONTAINER ─── */}
              {/* Tailwind's 'group-hover' sets opacity and transforms on mouse enter */}
              <div className="max-h-0 opacity-0 transform translate-y-6 overflow-hidden group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out mt-1">
                
                {/* Description Tagline */}
                <p className="text-xs text-gray-300 font-light tracking-wide mb-4 leading-relaxed">
                  {feature.tagline}
                </p>

                {/* Glassmorphism Premium Action Button */}
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase shadow-md hover:bg-white/20 transition-all duration-300">
                  Explore More <span className="text-[#E2B747]">→</span>
                </span>

              </div>

            </div>

          </a>

        ))}
      </div>

    </div>
  );
};

export default FeatureGrid;