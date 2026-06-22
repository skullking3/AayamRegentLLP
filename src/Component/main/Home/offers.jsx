import React from 'react'

// Dummy Data Arrays for 4 different dynamic offers
const offersData = [
  {
    id: 1,
    tag: "Exclusive Deal",
    title: "Goa Beach Escape",
    desc: "Get up to 30% off on premium sea-view villas at Aayam Resort Goa. Inclusive of complimentary breakfast.",
    btnText: "Book Goa Stay"
  },
  {
    id: 2,
    tag: "Limited Offer",
    title: "Munnar Hills Retreat",
    desc: "Experience luxury amidst the clouds. Book 3 nights at Aayam Munnar and pay only for 2 nights.",
    btnText: "Claim Offer"
  },
  {
    id: 3,
    tag: "Seasonal Package",
    title: "Royal Udaipur Tour",
    desc: "Live like kings this festive season. Flat 25% discount on presidential suites with private lake cruise.",
    btnText: "View Packages"
  },
  {
    id: 4,
    tag: "International Tour",
    title: "Bali Luxury Getaway",
    desc: "Explore stunning infinity pools in Jimbaran. Early bird offers get free private airport transfers.",
    btnText: "Explore Bali"
  }
];

const OffersSection = () => {
  return (
    // 🚨 DESIGN ENHANCEMENT: Changed background to clean premium transparent-dark glassmorphism to fit website theme
    <div className="w-[85vw] xl:w-[80vw] mx-auto my-20 bg-zinc-950/40 backdrop-blur-md border border-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
      
      {/* Top Header Area */}
      <div className="mb-12 text-center md:text-left">
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-2">
          Handpicked For You
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white font-normal tracking-wider relative inline-block uppercase">
          Offers
          {/* Subtle stylish gold underline decoration */}
          <span className="absolute bottom-[-8px] left-0 md:left-0 right-0 md:right-auto mx-auto md:mx-0 w-12 h-[2px] bg-[#E2B747]"></span>
        </h2>
      </div>

      {/* Grid Wrapper for 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
        {offersData.map((item) => (
          
          // Premium Luxury Dark Card Loop
          <div 
            key={item.id} 
            className="w-full max-w-[320px] min-h-[360px] bg-zinc-950/90 border border-zinc-900 rounded-2xl p-6 shadow-2xl hover:shadow-[0_0_25px_rgba(226,183,71,0.08)] hover:border-[#E2B747]/40 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Category Gold Tag */}
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#E2B747] font-bold mb-2">
                {item.tag}
              </p>
              {/* Card Title */}
              <h3 className="text-xl font-serif text-white font-normal group-hover:text-[#E2B747] transition-colors duration-300 tracking-wide">
                {item.title}
              </h3>
              {/* Card Description */}
              <p className="text-xs text-gray-400 mt-3 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>

            {/* Card Action Button fitted with Theme Colors */}
            <button className="w-full bg-zinc-900 text-white text-[10px] font-bold tracking-widest uppercase py-3.5 rounded-xl border border-zinc-800 hover:bg-[#E2B747] hover:text-black hover:border-transparent transition-all duration-300 mt-6">
              {item.btnText}
            </button>
          </div>

        ))}
      </div>

    </div>
  )
}

export default OffersSection;