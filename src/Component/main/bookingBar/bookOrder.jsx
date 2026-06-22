import React, { useState } from 'react';
import { Calendar, Users, MapPin, ArrowLeft, CreditCard } from 'lucide-react';

const bookOrder = ({ bookingData, onBack }) => {
  // Agar bookingData parent se nahi aa raha toh fallback values
  const data = bookingData || {
    destination: "Munnar Premium Luxury Tour",
    date: "2026-07-15",
    guests: "2 Adults",
    price: "₹14,999"
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.fullName}! Your booking request for ${data.destination} has been received.`);
    // Yahan aage chal kar payment gateway ya backend integration hoga
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Search
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Side: Booking Form (2 Columns wide) */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  rows="3"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                  placeholder="Any specific requirement or room preference..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 mt-6"
              >
                <CreditCard className="w-5 h-5" /> Confirm & Proceed to Book
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary Card (1 Column wide) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Booking Summary</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Destination</p>
                  <p className="text-sm font-medium text-gray-800">{data.destination}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Travel Date</p>
                  <p className="text-sm font-medium text-gray-800">{data.date}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Users className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Guests</p>
                  <p className="text-sm font-medium text-gray-800">{data.guests}</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Base Price</span>
                <span>{data.price}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxes & Fees (Gst)</span>
                <span>₹0.00</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span>{data.price}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default bookOrder;