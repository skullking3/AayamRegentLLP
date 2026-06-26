import React, { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;

const BookingTable = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    // 1. Fetch All Bookings
    const fetchBookings = () => {
        fetch(`${BASE_URL}/api/bookings/all`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.error("Error fetching bookings:", err));
    };

    // 2. Handle Delete Booking
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            fetch(`${BASE_URL}/api/bookings/delete/${id}`, { method: 'DELETE' })
                .then((res) => {
                    if (res.ok) {
                        alert("Booking Deleted Successfully!");
                        setBookings(bookings.filter(b => b.id !== id));
                    } else {
                        alert("Delete failed on server.");
                    }
                })
                .catch(err => console.error("Error:", err));
        }
    };

    return (
        <div className="p-3 sm:p-6 text-black bg-gray-300 min-h-screen box-border">
            <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wider text-gray-800">Management Booking Report</h2>
            
            {/* 1. MOBILE VIEW: Fluid Card Layout (Hidden on Desktop, Visible on Phone) */}
            <div className="block sm:hidden space-y-4">
                {bookings.length === 0 ? (
                    <div className="bg-white p-4 rounded-xl text-center text-gray-500">No bookings available.</div>
                ) : (
                    bookings.map((b) => (
                        <div key={b.id} className="bg-white p-4 rounded-xl shadow border border-gray-200 space-y-2">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="font-bold text-gray-900 text-base">{b.customerName}</span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${b.isMemberOrOwner === 'Owner' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                                    {b.isMemberOrOwner || 'Guest'}
                                </span>
                            </div>
                            
                            <div className="text-sm space-y-1 grid grid-cols-1 gap-0.5">
                                <p className="text-gray-700"><span className="font-semibold text-gray-500">Destination:</span> {b.destination}</p>
                                
                                <div className="flex justify-between bg-gray-50 p-2 rounded-lg my-1 text-xs">
                                    <div><span className="font-bold text-gray-500 block">CHECK-IN</span><span className="text-gray-800 font-medium">{b.checkIn}</span></div>
                                    <div className="text-right"><span className="font-bold text-gray-500 block">CHECK-OUT</span><span className="text-gray-800 font-medium">{b.checkOut}</span></div>
                                </div>

                                <p className="text-gray-700"><span className="font-semibold text-gray-500">Guests:</span> <span className="bg-gray-100 px-2 py-0.5 rounded-md font-mono font-bold text-xs">{b.guests}</span></p>
                                <p className="text-gray-700"><span className="font-semibold text-gray-500">Email:</span> {b.customerEmail}</p>
                                <p className="text-gray-700"><span className="font-semibold text-gray-500">Phone:</span> {b.customerPhone}</p>
                                <p className="text-gray-700"><span className="font-semibold text-gray-500">Address:</span> {b.customerAddress}</p>
                            </div>

                            <div className="pt-2 border-t mt-2">
                                <button 
                                    onClick={() => handleDelete(b.id)} 
                                    className="w-full bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-xl font-medium transition text-sm"
                                >
                                    Delete Booking
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 2. DESKTOP VIEW: Clean Table UI (Hidden on Phone, Visible on Bigger Screens) */}
            <div className="hidden sm:block overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-lg">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-gray-800 text-white border-b">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Destination</th>
                            <th className="p-3 text-left">Check-in</th>
                            <th className="p-3 text-left">Check-out</th>
                            <th className="p-3 text-center">Guests</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Address</th>
                            <th className="p-3 text-left">Member/Owner</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="p-4 text-center text-gray-500 bg-gray-50">No bookings found.</td>
                            </tr>
                        ) : (
                            bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50 border-b transition">
                                    <td className="p-3 border-r font-bold text-gray-900">{b.customerName}</td>
                                    <td className="p-3 border-r text-gray-700">{b.destination}</td>
                                    <td className="p-3 border-r text-gray-600 font-medium">{b.checkIn}</td>
                                    <td className="p-3 border-r text-gray-600 font-medium">{b.checkOut}</td>
                                    <td className="p-3 border-r text-center font-mono font-bold">{b.guests}</td>
                                    <td className="p-3 border-r text-gray-600 text-xs">{b.customerEmail}</td>
                                    <td className="p-3 border-r text-gray-600">{b.customerPhone}</td>
                                    <td className="p-3 border-r text-gray-600 max-w-xs truncate" title={b.customerAddress}>{b.customerAddress}</td>
                                    <td className="p-3 border-r">
                                        <span className={`text-xs px-2 py-1 rounded font-bold ${b.isMemberOrOwner === 'Owner' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                                            {b.isMemberOrOwner || 'Guest'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button 
                                            onClick={() => handleDelete(b.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-medium transition text-sm"
                                        >
                                            Del
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingTable;