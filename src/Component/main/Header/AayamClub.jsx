import React, { useState, useEffect } from 'react';

const AayamClub = () => {
  // Page load hote hi top par scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Structural visual styling definitions matching positions
  const uiStyles = {
    "Elite Silver": {
        accent: "border-zinc-700/60",
        buttonBg: "bg-zinc-900 text-white hover:bg-white hover:text-black"
    },
    "Royal Gold": {
        accent: "border-[#E2B747]/60 shadow-[0_0_30px_rgba(226,183,71,0.1)]",
        buttonBg: "bg-[#E2B747] text-black hover:bg-white"
    },
    "Imperial Platinum": {
        accent: "border-purple-900/40",
        buttonBg: "bg-purple-900 text-white hover:bg-[#E2B747] hover:text-black"
    }
  };

  // Fallback initial data in case API fails
  const [liveTiers, setLiveTiers] = useState([
    { name: "Elite Silver", price: "₹25,000 / yr", features: ["10% Additional Discount on Suites", "Access to Health Club & Swimming Pool"] },
    { name: "Royal Gold", price: "₹55,000 / yr", features: ["20% Additional Discount on All Bookings", "1500 Aayam Reward Points on Signup"] },
    { name: "Imperial Platinum", price: "₹1,200,000 / yr", features: ["30% Fixed Discount on Presidential Suites", "Private Yacht Privileges"] }
  ]);

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // Fetch full listing from backend 
  useEffect(() => {
     const getLiveClubData = async () => {
         try {
             const response = await fetch(`${BASE_URL}/api/public/club`);
             if(response.ok) {
                 const data = await response.json();
                 if(data && data.length > 0) {
                     setLiveTiers(data);
                 }
             }
         } catch(err) {
             console.error("Using local fallback tiers, backend connection offline:", err);
         }
     };
     getLiveClubData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0b0e14] text-white py-12 md:py-20 px-4 md:px-12 select-none relative overflow-hidden">
      
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#E2B747]/5 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#E2B747]/5 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />

      {/* Header/Branding Section */}
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20 relative z-10">
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] md:tracking-[0.5em] text-[#E2B747] uppercase block mb-3">
          Only apply on members
        </span>
        <h2 className="text-2xl md:text-5xl font-serif tracking-wider font-normal uppercase text-white">
          Club <span className="text-[#E2B747]">Aayam</span> Privileges
        </h2>
        <p className="text-[11px] md:text-sm text-gray-500 font-light mt-3 max-w-2xl mx-auto leading-relaxed px-2">
          Step into a world of bespoke hospitality, curated experiences, and elite member-only tiers designed exclusively for connoisseurs of luxury.
        </p>
      </div>

      {/* Membership Tiers Cards Layout - Full Mobile Friendly Flow */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10 items-stretch mb-16 md:mb-20">
        {liveTiers.map((tier, index) => {
          // Dynamic Style mapping according to Tier Name matching
          const style = uiStyles[tier.name] || uiStyles["Elite Silver"];
          return (
            <div 
              key={index}
              className={`bg-zinc-900/30 backdrop-blur-xl border ${style.accent} p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between group hover:scale-[1.01] md:hover:scale-[1.02] transition-all duration-500`}
            >
              <div>
                {/* Card Header */}
                <div className="border-b border-zinc-800/60 pb-5 mb-5">
                  <h3 className="text-lg md:text-xl font-serif tracking-wide text-white group-hover:text-[#E2B747] transition-colors">
                    {tier.name}
                  </h3>
                  <p className="text-xl md:text-2xl font-mono text-[#E2B747] font-semibold mt-1.5">
                    {tier.price}
                  </p>
                </div>

                {/* Card Features List */}
                <ul className="space-y-3.5 mb-6 md:mb-8">
                  {tier.features && tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[11px] md:text-xs text-gray-400 font-light leading-relaxed">
                      <span className="text-[#E2B747] text-xs mt-0.5">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Join Button */}
              <button className={`w-full h-11 md:h-12 rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${style.buttonBg}`}>
                Request Invitation
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Luxury Statement Banner */}
      <div className="max-w-5xl mx-auto bg-zinc-950/80 border border-zinc-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 text-center relative z-10 backdrop-blur-md">
        <h4 className="text-sm md:text-xl font-serif tracking-wider text-white mb-2.5">
          LOOKING FOR CUSTOM CORPORATE MEMBERSHIPS?
        </h4>
        <p className="text-[11px] md:text-xs text-gray-500 max-w-xl mx-auto font-light mb-5 leading-normal">
          Our private desk curates customized corporate packages, elite benefits, and continuous dynamic luxury stays for global enterprises.
        </p>
        <a href="#contact" className="inline-block text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-[#E2B747] border-b border-dashed border-[#E2B747]/50 pb-1 hover:text-white hover:border-white transition-colors">
          Connect With Our Desk →
        </a>
      </div>

    </div>
  );
};

export default AayamClub;