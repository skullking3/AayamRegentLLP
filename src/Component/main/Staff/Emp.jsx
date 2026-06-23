import React from 'react'
import { Outlet, Link } from 'react-router-dom';

const Emp = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6">
        <h2 className="text-[#E2B747] font-serif text-xl mb-8">Aayam Employee</h2>
        <nav className="space-y-4">
          <Link to="UserBooking" className="block text-sm hover:text-[#E2B747]">User Booking</Link>
          <Link to="members" className="block text-sm hover:text-[#E2B747]">Member Booking</Link>
        </nav>
      </aside>

      {/* Dynamic Content Area */}
      <main className="flex-1 p-8"> 
      </main>
    </div>
  )
}

export default Emp
