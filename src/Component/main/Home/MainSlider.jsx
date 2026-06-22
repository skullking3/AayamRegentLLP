import React, { useState, useEffect } from 'react';
import { ArrowLeft,ArrowRight } from 'lucide-react';

const SliderData = [
  {
    id: 1,
    area: "Kerala",
    location:"India",
    img: "https://www.keralatourism.org/_next/image/?url=http%3A%2F%2F127.0.0.1%2Fktadmin%2Fimg%2Fpages%2Flarge-desktop%2Fthunchan-memorial-tirur-1742120299_056cbd418bc1b0ba91cd.webp&w=1920&q=75"   
  },
  {
    id: 2,
    area: "Goa",
    location:"India",
    img: "https://images.unsplash.com/photo-1652820330085-82a0c2b88d78?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id:3,
    area:"Maldives",
    location:"International",
    img:"https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id:4,
    area:"Switzerland",
    location:"International",
    img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    area: "Uttar Pradesh",
    location:"India",
    img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=2120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    area:"Jaipur",
    location:"India",
    img:"https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id:7,
    area:"Thailand",
    location:"International",
    img :"https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const MainSlider = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === SliderData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? SliderData.length - 1 : prevIndex - 1
    );
  };

  
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000); // 3000ms = 3 seconds


    return () => clearInterval(timer);
  }, [currentIndex]); 


  const currentSlide = SliderData[currentIndex];

  return (
    <div className="w-full h-[500px] md:h-[600px] relative overflow-hidden font-sans">
      
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentSlide.img})` }}
      >
       
        <div className="absolute inset-0 bg-black/40"></div>

     
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl font-light z-20 p-2 select-none"
        >
          <ArrowLeft />
        </button>

       
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-4">
          
          <h1 className="text-4xl md:text-6xl font-serif text-[#E2B747] font-normal tracking-wide drop-shadow-lg">
            {currentSlide.area}
          </h1>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-1 drop-shadow-md">
            {currentSlide.location}
          </p>
        </div>

        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl font-light z-20 p-2 select-none"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default MainSlider;
