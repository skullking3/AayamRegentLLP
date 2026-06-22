import React from 'react'

const AboutUs = () => {
  return (
    /* 🚨 FIXED: 'select-none' ko hata kar 'select-text' kiya, ab text desktop aur mobile dono par select ho jayega */
    <div className="w-full min-h-screen bg-black text-white py-16 px-6 flex flex-col items-center justify-center select-text selection:bg-[#E2B747]/30">
      
      {/* Container Box */}
      <div className="w-full max-w-4xl bg-zinc-950/50 backdrop-blur-xl border border-zinc-900/80 rounded-[2.5rem] p-8 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Top Radial Glow Background effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[#E2B747]/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#E2B747] uppercase block mb-3">
            The Aayam Experience
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-normal tracking-wide relative inline-block uppercase">
            About Us
            <span className="absolute bottom-[-10px] left-0 right-0 mx-auto w-16 h-[2px] bg-[#E2B747]"></span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Welcome to Aayam Regent, where luxury meets tranquility. We curate elite stays and premium hospitality experiences designed to give you unforgettable memories amidst nature's finest landscapes.
          </p>
        </div>

        {/* Main Content Grid: Address vs Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start border-t border-zinc-900/60 pt-12">
          
          {/* LEFT SIDE: Luxury Address Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-widest text-[#E2B747] uppercase">Our Address</span>
              <div className="h-[1px] flex-1 bg-zinc-900" />
            </div>
            
            <h3 className="text-2xl font-serif text-zinc-200 tracking-wide">Panchmarhi Resort</h3>
            
            <div className="text-sm text-zinc-400 font-light leading-relaxed space-y-1 mt-3">
              <p className="text-zinc-200 font-medium">Samarth Home stay,</p>
              <p>Patel Road Panchmarhi,</p>
              <p>Ward no. 2,</p>
              <p>Dist. Hoshangabad,</p>
              <p>Madhya Pradesh</p>
              <p className="text-[#E2B747] font-mono tracking-wider text-xs mt-2">PIN CODE - 461881</p>
            </div>
          </div>

          {/* RIGHT SIDE: Support & Interactive Click Actions */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-widest text-[#E2B747] uppercase">Customer Support</span>
              <div className="h-[1px] flex-1 bg-zinc-900" />
            </div>

            {/* Email Box Action */}
            <div className="group">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1.5 font-medium">Email Address</p>
              <a 
                href="mailto:aayamregent@gmail.com" 
                className="inline-flex items-center gap-3 text-zinc-300 hover:text-[#E2B747] transition-all duration-300 text-sm font-light bg-zinc-900/30 border border-zinc-900 px-4 py-3 rounded-xl w-full"
              >
                <span className="text-base">✉️</span>
                <span className="tracking-wide group-hover:translate-x-1 transition-transform duration-300">aayamregent@gmail.com</span>
              </a>
            </div>

            {/* Phone Numbers Action */}
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1.5 font-medium">Helpline Numbers</p>
              
              {/* Phone 1 */}
              <a 
                href="tel:+919172437987" 
                className="group flex items-center gap-3 text-zinc-300 hover:text-[#E2B747] transition-all duration-300 text-sm font-mono bg-zinc-900/30 border border-zinc-900 px-4 py-3 rounded-xl w-full"
              >
                <span className="text-base">☎️</span>
                <span className="tracking-widest group-hover:translate-x-1 transition-transform duration-300">+91 91724 37987</span>
              </a>

              {/* Phone 2 */}
              <a 
                href="tel:+918669637987" 
                className="group flex items-center gap-3 text-zinc-300 hover:text-[#E2B747] transition-all duration-300 text-sm font-mono bg-zinc-900/30 border border-zinc-900 px-4 py-3 rounded-xl w-full"
              >
                <span className="text-base">☎️</span>
                <span className="tracking-widest group-hover:translate-x-1 transition-transform duration-300">+91 86696 37987</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default AboutUs;