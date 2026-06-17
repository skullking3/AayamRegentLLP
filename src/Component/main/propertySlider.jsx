import React, { useState, useEffect, useRef } from 'react';

// 10 Premium Luxury Dummy Stays Data Array
const propertiesData = [
  { id: 1, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600", title: "Hidden Quill Haven", location: "New York, USA", stats: "4 Guests · 2 Beds · 2 Baths · 1500 ft²", price: "$246", rating: "4.9" },
  { id: 2, img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600", title: "Coastal Haven Lodge", location: "Andalusia, Spain", stats: "5 Guests · 3 Beds · 2 Baths · 1600 ft²", price: "$299", rating: "4.8" },
  { id: 3, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600", title: "Brass Lantern Inn", location: "Paris, France", stats: "6 Guests · 3 Beds · 2 Baths · 1500 ft²", price: "$325", rating: "4.5" },
  { id: 4, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600", title: "Golden Willowbrook Mansion", location: "Florence, Italy", stats: "5 Guests · 3 Beds · 2 Baths · 1500 ft²", price: "$249", rating: "4.8" },
  { id: 5, img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600", title: "The Verdant Frame", location: "Jakarta, Indonesia", stats: "5 Guests · 2 Beds · 2 Baths · 1500 ft²", price: "$330", rating: "4.6" },
  { id: 6, img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=600", title: "Silver Fern Estate", location: "Yellowknife, Canada", stats: "4 Guests · 2 Beds · 2 Baths · 1500 ft²", price: "$359", rating: "4.9" },
  { id: 7, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600", title: "Aayam Heritage Mahal", location: "Udaipur, India", stats: "6 Guests · 4 Beds · 4 Baths · 3200 ft²", price: "$450", rating: "5.0" },
  { id: 8, img: "https://images.unsplash.com/photo-1610641818989-c20250d033b1?q=80&w=600", title: "Emerald Riviera Villa", location: "Goa, India", stats: "4 Guests · 3 Beds · 3 Baths · 2100 ft²", price: "$280", rating: "4.7" },
  { id: 9, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600", title: "Siam Whispering Palms", location: "Phuket, Thailand", stats: "5 Guests · 2 Beds · 3 Baths · 1800 ft²", price: "$310", rating: "4.8" },
  { id: 10, img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600", title: "Alpina Crest Chalet", location: "Zermatt, Switzerland", stats: "4 Guests · 2 Beds · 2 Baths · 1400 ft²", price: "$420", rating: "4.9" }
];

const propertySlider = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const sliderRef = useRef(null);

  // Function to Slide Next
  const handleNext = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstChild.clientWidth + 24; // Card width + gap
      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      
      if (sliderRef.current.scrollLeft >= maxScroll - 5) {
        // Agar end par pahunch gaye, toh loop back to start smoothly
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: cardWidth * 2, behavior: 'smooth' }); // Shifts 2 cards at a time
      }
    }
  };

  // Function to Slide Prev
  const handlePrev = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstChild.clientWidth + 24;
      if (sliderRef.current.scrollLeft <= 5) {
        // Agar start par hain, toh end par jump kar jaye
        sliderRef.current.scrollTo({ left: sliderRef.current.scrollWidth, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
      }
    }
  };

  // 10 Seconds Automatic Slider Mechanism
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000); // 10000ms = 10 Seconds

    return () => clearInterval(timer); // Cleanup function data load unmount par memory leak rokne ke liye
  }, []);

  return (
    <div className="w-[85vw] mx-auto my-20 font-sans relative">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Where Comfort Meets Convenience
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Discover handpicked stays that blend luxury and practicality.
        </p>
      </div>

      {/* FILTER BUTTONS & CONTROLS ROW */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-4">
        {/* Categories Tab */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          {['All', 'Apartment', 'Resort', 'Lodge', 'Hotel'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#b58e2a] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Manual Navigation Buttons (Next / Prev) */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm"
          >
            →
          </button>
        </div>
      </div>

      {/* 10 CARDS GRID CONTAINER (HORIZONTALLY SCROLLABLE) */}
      <div 
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none py-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }} // Firefox hidden scroll bar support
      >
        {propertiesData.map((item) => (
          
          /* Single Luxury Card Frame */
          <div 
            key={item.id}
            className="min-w-[290px] sm:min-w-[340px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100/80 transition-all duration-300 group snap-start flex-shrink-0"
          >
            {/* Property Image Container */}
            <div className="relative h-56 w-full overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {/* Dynamic Favorite Heart Badge */}
              <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-white shadow-sm transition-colors">
                ♥
              </button>
            </div>

            {/* Property Descriptions Block */}
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-gray-800 text-base truncate group-hover:text-[#b58e2a] transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-medium text-gray-700 flex items-center gap-1 shrink-0">
                  ★ {item.rating}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{item.location}</p>
              
              {/* Technical features tags */}
              <p className="text-[11px] text-gray-500 mt-3 border-t border-gray-50 pt-3 truncate">
                {item.stats}
              </p>

              {/* Price Tag Row */}
              <div className="flex items-center justify-between mt-4 pt-1">
                <p className="text-gray-900 font-bold text-base">
                  {item.price}<span className="text-xs font-normal text-gray-400">/night</span>
                </p>
                <button className="text-xs font-semibold text-[#b58e2a] tracking-wider uppercase hover:underline">
                  Book Now →
                </button>
              </div>
            </div>

          </div>

        ))}
      </div>

    </div>
  );
};

export default propertySlider;