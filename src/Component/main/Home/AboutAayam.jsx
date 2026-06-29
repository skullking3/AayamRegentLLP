import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutAayam = () => {
  // Page load sequence handling - Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const offers = [
    {
      id: 1,
      title: "Lifetime of Holidays",
      desc: "One-time membership, vacations for years. Use points to book stays, upgrade rooms, or choose new destinations."
    },
    {
      id: 2,
      title: "Premium Resorts",
      desc: "Handpicked 3-star & 4-star properties with pools, fine-dining restaurants, and curated activities."
    },
    {
      id: 3,
      title: "Complete Flexibility",
      desc: "Travel solo, with family, or exchange your week for destinations worldwide through our partner network."
    },
    {
      id: 4,
      title: "No Hidden Surprises",
      desc: "Transparent pricing with absolute zero hidden booking fees. Your lifetime vacation budget, permanently locked in."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0b0e14] text-white py-16 md:py-24 px-4 md:px-12 select-none relative overflow-hidden">
      
      {/* Background Premium Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#E2B747]/5 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#E2B747]/5 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 md:space-y-28">
        
        {/* ─── SECTION 1: HERO/BRANDING HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-bold tracking-[0.5em] text-[#E2B747] uppercase block">
            Discover Our Legacy
          </span>
          <h1 className="text-3xl md:text-6xl font-serif tracking-wider font-normal uppercase text-white leading-tight">
            About <span className="text-[#E2B747]">Aayam Regent</span> LLP
          </h1>
          <div className="w-20 h-[1px] bg-[#E2B747]/40 mx-auto mt-2" />
          <p className="text-sm md:text-lg text-gray-400 font-serif italic font-light pt-3 leading-relaxed">
            "Holidays shouldn’t be a once-a-year stress. We make sure your getaway is always booked, always yours."
          </p>
          <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            Since our inception, we’ve been helping families and passionate travelers own their dream vacations across India’s most breathtaking destinations. From Goa’s sun-kissed beaches to Himachal’s serene mountains.
          </p>
        </div>

        {/* ─── SECTION 2: STATS METRICS DESK ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-800/40 p-6 md:p-8 rounded-[2rem] group hover:border-[#E2B747]/30 transition-all duration-300">
            <h3 className="text-3xl md:text-5xl font-mono font-bold text-[#E2B747]">11+</h3>
            <p className="text-[10px] md:text-xs text-gray-400 tracking-widest uppercase mt-2 font-light">Years of Crafting Stays</p>
          </div>
          <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-800/40 p-6 md:p-8 rounded-[2rem] group hover:border-[#E2B747]/30 transition-all duration-300">
            <h3 className="text-3xl md:text-5xl font-mono font-bold text-[#E2B747]">2,000+</h3>
            <p className="text-[10px] md:text-xs text-gray-400 tracking-widest uppercase mt-2 font-light">Successful Domestic Tours</p>
          </div>
          <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-800/40 p-6 md:p-8 rounded-[2rem] group hover:border-[#E2B747]/30 transition-all duration-300">
            <h3 className="text-3xl md:text-5xl font-mono font-bold text-[#E2B747]">500+</h3>
            <p className="text-[10px] md:text-xs text-gray-400 tracking-widest uppercase mt-2 font-light">International Itineraries</p>
          </div>
        </div>

        {/* ─── SECTION 3: OUR STORY ─── */}
        <div className="bg-zinc-900/10 border border-zinc-900/80 rounded-[2.5rem] p-8 md:p-14 max-w-5xl mx-auto relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E2B747]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <span className="text-[9px] font-bold tracking-[0.3em] text-[#E2B747] uppercase block mb-1">The Genesis</span>
              <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide text-white">Our Story</h2>
            </div>
            <div className="md:col-span-2 space-y-4 text-xs md:text-sm text-gray-400 font-light leading-relaxed">
              <p>
                Aayam Regent LLP started with one simple yet revolutionary idea: <strong className="text-white font-medium">Vacations are better when you don’t have to plan everything from scratch every single time.</strong>
              </p>
              <p>
                What began as a single boutique resort property has now dynamically evolved into an elite premium network of signature destinations across India. Today, thousands of families place their trust in us to provide hassle-free, high-quality bespoke holidays year after year.
              </p>
            </div>
          </div>
        </div>

        {/* ─── SECTION 4: WHAT WE OFFER GRID ─── */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[9px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block">Exclusive Privileges</span>
            <h2 className="text-2xl md:text-4xl font-serif uppercase tracking-wider text-white">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-zinc-950/40 border border-zinc-900/60 p-6 md:p-8 rounded-[2rem] hover:scale-[1.01] hover:border-zinc-800 transition-all duration-300 flex gap-4 items-start group"
              >
                <span className="text-[#E2B747] font-mono text-sm md:text-lg bg-zinc-900/80 w-8 h-8 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:bg-[#E2B747] group-hover:text-black transition-colors duration-300 shrink-0">
                  0{offer.id}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-sm md:text-base font-serif text-white uppercase tracking-wide group-hover:text-[#E2B747] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-gray-500 font-light leading-relaxed">
                    {offer.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 5: OUR PROMISE BANNER (CTA) ─── */}
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-zinc-900/40 to-zinc-950 border border-zinc-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-10 bg-[#E2B747]/10 rounded-full blur-xl pointer-events-none" />
          
          <span className="text-[9px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-2">Absolute Commitment</span>
          <h4 className="text-lg md:text-2xl font-serif tracking-wider text-white mb-4 uppercase">
            Our Promise to You
          </h4>
          <p className="text-[11px] md:text-sm text-gray-400 max-w-2xl mx-auto font-light mb-8 leading-relaxed">
            We don’t just sell timeshares. We secure time with your loved ones. With Aayam Regent, there are no last-minute cancellations or sold-out date stresses. Just your premium room, perfectly prepared and ready when you are.
          </p>
          
          <Link 
            to="/aayam-club" 
            className="inline-block bg-[#E2B747] hover:bg-white text-black text-[10px] md:text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
          >
            Explore Club Memberships →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutAayam;