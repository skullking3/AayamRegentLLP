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
    // 1. Main 80vw Dynamic Container with Custom Luxury Shadows
    <div className="w-[80vw] mx-auto my-20 bg-[linear-gradient(135deg,_#98ee73a3_0%,_#f6f6a3_50%,_#b390f3_100%)] border-2 border-solid border-gray-300 rounded-[2rem] p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.12)]]">
      
      {/* 2. Top Header Area */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#b58e2a] uppercase block mb-1">
          Handpicked For You
        </span>
        <h1 className="text-3xl md:text-4xl font-serif text-gray-800 font-normal tracking-wide relative inline-block">
          Offers
          {/* Subtle stylish underline decoration */}
          <span className="absolute bottom-[-6px] left-0 md:left-0 right-0 md:right-auto mx-auto md:mx-0 w-12 h-[2px] bg-[#b58e2a]"></span>
        </h1>
      </div>

      {/* 3. Grid Wrapper for 4 Cards (Responsive Layout) */}
      {/* Mobile: 1 Column | Tablet: 2 Columns | Large Desktop: 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center ">
        {offersData.map((item) => (
          
          // Custom Offer Card inside Loop
          <div 
            key={item.id} 
            className="w-full max-w-[320px] h-85 bg-black border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-gray-300/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Category Tag */}
              <p className="text-[9px] uppercase tracking-[0.15em] text-[#b58e2a] font-bold mb-1.5">
                {item.tag}
              </p>
              {/* Card Title */}
              <h3 className="text-xl font-serif text-white font-normal group-hover:text-[#b58e2a] transition-colors duration-200">
                {item.title}
              </h3>
              {/* Card Description */}
              <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>

            {/* Card Action Button */}
            <button className="w-full bg-gray-900 text-white text-[10px] font-semibold tracking-widest uppercase py-3 rounded-xl hover:bg-[#b58e2a] shadow-sm hover:shadow-md transition-all duration-300 mt-4">
              {item.btnText}
            </button>
          </div>

        ))}
      </div>

    </div>
  )
}

export default OffersSection;