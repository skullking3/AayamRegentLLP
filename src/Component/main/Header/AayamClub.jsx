import React, { useEffect } from 'react';

const AayamClub = () => {
  // Page load hote hi top par scroll karne ke liye
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const tiers = [
    {
      name: "Elite Silver",
      price: "₹25,000 / yr",
      features: [
        "10% Additional Discount on Suites",
        "Complimentary Welcome Drink & Fruit Platter",
        "Early Check-in / Late Check-out (Subject to availability)",
        "Access to Health Club & Swimming Pool",
        "500 Aayam Reward Points on Signup"
      ],
      accent: "border-zinc-700/60",
      buttonBg: "bg-zinc-900 text-white hover:bg-white hover:text-black"
    },
    {
      name: "Royal Gold",
      price: "₹55,000 / yr",
      features: [
        "20% Additional Discount on All Bookings",
        "Free Room Upgrade to Next Higher Category",
        "Complimentary Buffet Breakfast for 2 Guests",
        "24/7 Dedicated Butler Service Support",
        "Access to VIP Airport Lounge Transfers",
        "1500 Aayam Reward Points on Signup"
      ],
      accent: "border-[#E2B747]/60 shadow-[0_0_30px_rgba(226,183,71,0.1)]",
      buttonBg: "bg-[#E2B747] text-black hover:bg-white"
    },
    {
      name: "Imperial Platinum",
      price: "₹1,200,000 / yr",
      features: [
        "30% Fixed Discount on Presidential Suites",
        "Guaranteed Room Upgrades & Free Stay Vouchers",
        "All-Inclusive Fine Dining & Premium Bar Access",
        "Private Yacht & Helicopter Charter Privileges",
        "Invitation to Exclusive Aayam Annual Galas",
        "Customized Bespoke Curations & Amenity Kits"
      ],
      accent: "border-purple-900/40",
      buttonBg: "bg-purple-900 text-white hover:bg-[#E2B747] hover:text-black"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0b0e14] text-white py-20 px-4 md:px-12 select-none relative overflow-hidden">
      
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-[#E2B747]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[600px] h-[600px] bg-[#E2B747]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header/Branding Section */}
      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <span className="text-[10px] font-bold tracking-[0.5em] text-[#E2B747] uppercase block mb-3">
          The Inner Circle
        </span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-wider font-normal uppercase text-white">
          Club <span className="text-[#E2B747]">Aayam</span> Privileges
        </h2>
        <p className="text-xs md:text-sm text-gray-500 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
          Step into a world of bespoke hospitality, curated experiences, and elite member-only tiers designed exclusively for connoisseurs of luxury.
        </p>
      </div>

      {/* Membership Tiers Cards Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch mb-20">
        {tiers.map((tier, index) => (
          <div 
            key={index}
            className={`bg-zinc-900/30 backdrop-blur-xl border ${tier.accent} p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between group hover:scale-[1.02] transition-all duration-500`}
          >
            <div>
              {/* Card Header */}
              <div className="border-b border-zinc-800/60 pb-6 mb-6">
                <h3 className="text-xl font-serif tracking-wide text-white group-hover:text-[#E2B747] transition-colors">
                  {tier.name}
                </h3>
                <p className="text-2xl font-mono text-[#E2B747] font-semibold mt-2">
                  {tier.price}
                </p>
              </div>

              {/* Card Features List */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-gray-400 font-light leading-relaxed">
                    <span className="text-[#E2B747] text-sm mt-0.5">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Join Button */}
            <button className={`w-full h-12 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${tier.buttonBg}`}>
              Request Invitation
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Luxury Statement Banner */}
      <div className="max-w-5xl mx-auto bg-zinc-950/80 border border-zinc-900 rounded-[2.5rem] p-8 md:p-12 text-center relative z-10 backdrop-blur-md">
        <h4 className="text-lg md:text-xl font-serif tracking-wider text-white mb-3">
          LOOKING FOR CUSTOM CORPORATE MEMBERSHIPS?
        </h4>
        <p className="text-xs text-gray-500 max-w-xl mx-auto font-light mb-6">
          Our private desk curates customized corporate packages, elite benefits, and continuous dynamic luxury stays for global enterprises.
        </p>
        <a href="#contact" className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#E2B747] border-b border-dashed border-[#E2B747]/50 pb-1 hover:text-white hover:border-white transition-colors">
          Connect With Our Desk →
        </a>
      </div>

    </div>
  );
};

export default AayamClub;