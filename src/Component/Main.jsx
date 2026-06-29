import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 👈 React Router se location track karne ke liye import kiya
import Slider from './main/Home/MainSlider.jsx'
import Bar from "./main/bookingBar/BookingBar.jsx"
import Offers from "./main/Home/offersSection.jsx"
import Property from "./main/Home/propertySlider.jsx"
import Features from './main/Home/Features.jsx'
import Destination from './main/Home/Destination.jsx'

const Main = () => {
  const location = useLocation();

  useEffect(() => {
    // Agar user kisi dusre page (jaise Aayam Club) se Offers par click karke aaya hai
    if (location.state && location.state.scrollToSection) {
      const element = document.getElementById(location.state.scrollToSection);
      if (element) {
        // 100ms ka minor delay diya hai taaki slider aur DOM sahi se render ho jayein
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      
      // Clear history state taaki reload karne par baar-baar auto-scroll na ho
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div>
      <Slider />
      <Bar />
      
      {/* 🚨 Offers component ko div wrapper me wrap kiya aur ID di taaki scroll yahan hit kare */}
      <div id="offers-section" className="scroll-mt-20"> 
        <Offers />
      </div>

      <Property />
      <Features />
      <Destination />
    </div>
  )
}

export default Main;