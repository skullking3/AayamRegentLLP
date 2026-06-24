import React, { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL ;

const BookingTable = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        
        fetch(`${BASE_URL}/api/bookings/all`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.error("Error:", err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Sure to delete?")) {
            fetch(`${BASE_URL}/api/bookings/delete/${id}`, { method: 'DELETE' })
                .then(() => setBookings(bookings.filter(b => b.id !== id)))
                .catch(err => console.error("Error:", err));
        }
    };

    return (
        <div className="p-2 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Management Booking Report</h2>
            
            {/* Horizontal scroll enabled for all fields */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white text-black text-xs md:text-sm">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Destination</th>
                            <th className="p-2 border">Check-in</th>
                            <th className="p-2 border">Check-out</th>
                            <th className="p-2 border">Guests</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Address</th>
                            <th className="p-2 border">Member/Owner</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-100 border-b">
                                <td className="p-2 border font-bold">{b.customerName}</td>
                                <td className="p-2 border">{b.destination}</td>
                                <td className="p-2 border">{b.checkIn}</td>
                                <td className="p-2 border">{b.checkOut}</td>
                                <td className="p-2 border">{b.guests}</td>
                                <td className="p-2 border">{b.customerEmail}</td>
                                <td className="p-2 border">{b.customerPhone}</td>
                                <td className="p-2 border">{b.customerAddress}</td>
                                <td className="p-2 border">{b.isMemberOrOwner}</td>
                                <td className="p-2 border text-center">
                                    <button 
                                        onClick={() => handleDelete(b.id)}
                                        className="bg-red-500 text-black px-2 py-1 rounded"
                                    >
                                        Del
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingTable;