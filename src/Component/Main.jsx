import Slider from './main/MainSlider.jsx'
import Bar from "./main/BookingBar.jsx"
import Offers from "./main/offers.jsx"
import Property from "./main/propertySlider.jsx"
import Features from './main/Features.jsx'
import Destination from './main/Destination.jsx'

const Main = () => {
  return (
    <div>
      <Slider></Slider>
      <Bar></Bar>
      <Offers></Offers>
      <Property></Property>
      <Features></Features>
      <Destination></Destination>
    </div>
  )
}

export default Main
