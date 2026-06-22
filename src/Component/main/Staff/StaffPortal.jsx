import React, { useState } from 'react';

// Dummy Reservation Requests for Staff to Manage (Based on your fields)
const initialRequests = [
  {
    id: "RES-2026-01",
    guestName: "Vishal Kumar",
    email: "Callvk3@gmail.com",
    phone: "8317095224",
    address: "Govt PolyTechnic barabanki",
    destination: "Goa, India",
    checkIn: "2026-10-14",
    checkOut: "2026-10-21",
    guests: "2 Adults, 1 Children",
    isMember: "NO",
    status: "Pending"
  },
  {
    id: "RES-2026-02",
    guestName: "Ananya Sharma",
    email: "ananya@example.com",
    phone: "9876543210",
    address: "Hazratganj, Lucknow",
    destination: "Valais (Zermatt), Switzerland",
    checkIn: "2026-12-20",
    checkOut: "2026-12-27",
    guests: "2 Adults",
    isMember: "YES",
    status: "Approved"
  },
  {
    id: "RES-2026-03",
    guestName: "Gaurav Singh",
    email: "Gaf@gan.com",
    phone: "8329426744",
    address: "Govtkakxcb",
    destination: "Rajasthan (Udaipur), India",
    checkIn: "2026-11-05",
    checkOut: "2026-11-10",
    guests: "1 Adults",
    isMember: "NO",
    status: "Cancelled"
  }
];

const StaffPortal = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Handle Status Update (Approve / Cancel)
  const handleStatusChange = (id, newStatus) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Filter requests based on tab selection
  const filteredRequests = requests.filter(req => {
    if (statusFilter === 'All') return true;
    return req.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 md:p-8">
      
      {/* PORTAL HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#b58e2a]">Aayam Regent LLP</span>
          <h1 className="text-2xl md:text-3xl font-serif text-white mt-1">Staff Concierge Portal</h1>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl self-start">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-zinc-400">Live Request Desk</span>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl">
          <p className="text-xs text-zinc-500 font-medium uppercase">Total Requests</p>
          <p className="text-xl md:text-2xl font-serif text-white mt-1">{requests.length}</p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl">
          <p className="text-xs text-zinc-500 font-medium uppercase">Pending Elite</p>
          <p className="text-xl md:text-2xl font-serif text-[#b58e2a] mt-1">
            {requests.filter(r => r.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl">
          <p className="text-xs text-zinc-500 font-medium uppercase">Approved</p>
          <p className="text-xl md:text-2xl font-serif text-emerald-500 mt-1">
            {requests.filter(r => r.status === 'Approved').length}
          </p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl">
          <p className="text-xs text-zinc-500 font-medium uppercase">Members</p>
          <p className="text-xl md:text-2xl font-serif text-sky-400 mt-1">
            {requests.filter(r => r.isMember === 'YES').length}
          </p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'Pending', 'Approved', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${
              statusFilter === status
                ? 'bg-[#b58e2a] text-white border-transparent shadow-lg'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {status} ({status === 'All' ? requests.length : requests.filter(r => r.status === status).length})
          </button>
        ))}
      </div>

      {/* MAIN CONTAINER: LIST & DETAIL VIEW */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* REQUESTS LIST WORKSPACE */}
        <div className="lg:col-span-2 space-y-3">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  selectedRequest?.id === req.id
                    ? 'bg-zinc-900 border-[#b58e2a] shadow-lg shadow-[#b58e2a]/5'
                    : 'bg-zinc-900/50 border-zinc-900 hover:border-zinc-800'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono tracking-wider text-zinc-500">{req.id}</span>
                    {req.isMember === 'YES' && (
                      <span className="text-[9px] bg-gradient-to-r from-[#c59b27] to-[#94711c] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                        Owner/Member
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base text-zinc-100 mt-1">{req.guestName}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">📍 {req.destination}</p>
                  <p className="text-[11px] text-zinc-500 mt-2">⏱ {req.checkIn} to {req.checkOut}</p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    req.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                    req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {req.status}
                  </span>
                  <span className="text-xs text-[#b58e2a] font-semibold hidden sm:inline group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-zinc-900 rounded-2xl text-zinc-500 text-sm">
              No requests found under this filter.
            </div>
          )}
        </div>

        {/* SIDE DETAIL CONSOLE (RIGHT PANEL) */}
        <div className="lg:col-span-1">
          {selectedRequest ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-6 shadow-xl">
              <div className="border-b border-zinc-800/80 pb-4 mb-4">
                <span className="text-[11px] font-mono text-[#b58e2a] tracking-wider">{selectedRequest.id}</span>
                <h2 className="text-xl font-serif text-white mt-1">Reservation Details</h2>
              </div>

              {/* Data Rows */}
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-[11px] text-zinc-500 uppercase font-medium tracking-wide">Guest Name</p>
                  <p className="text-zinc-200 font-medium mt-0.5">{selectedRequest.guestName}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[11px] text-zinc-500 uppercase font-medium tracking-wide">Phone Number</p>
                    <p className="text-zinc-200 mt-0.5 font-mono">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 uppercase font-medium tracking-wide">Email</p>
                    <p className="text-zinc-200 mt-0.5 truncate">{selectedRequest.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-zinc-500 uppercase font-medium tracking-wide">Complete Address</p>
                  <p className="text-zinc-300 mt-0.5 text-xs bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-800/60 leading-relaxed">
                    {selectedRequest.address}
                  </p>
                </div>
                <div className="bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-800/50 space-y-2">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-medium tracking-wide">Destination</p>
                    <p className="text-zinc-200 font-serif text-sm">{selectedRequest.destination}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-zinc-400 pt-1">
                    <p>📅 In: <span className="text-zinc-200 font-mono">{selectedRequest.checkIn}</span></p>
                    <p>📅 Out: <span className="text-zinc-200 font-mono">{selectedRequest.checkOut}</span></p>
                  </div>
                  <p className="text-xs text-zinc-400 pt-1 border-t border-zinc-900">👥 Guests: <span className="text-zinc-200 font-medium">{selectedRequest.guests}</span></p>
                </div>
              </div>

              {/* ACTION CONSOLE BUTTONS */}
              {selectedRequest.status === 'Pending' && (
                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-zinc-800/80">
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'Cancelled')}
                    className="py-2.5 rounded-xl border border-zinc-800 text-xs font-semibold hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/50 transition-all uppercase tracking-wider"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'Approved')}
                    className="py-2.5 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#94711c] text-white text-xs font-semibold hover:opacity-90 shadow-lg shadow-[#b58e2a]/10 transition-all uppercase tracking-wider"
                  >
                    Approve Request
                  </button>
                </div>
              )}

              {selectedRequest.status !== 'Pending' && (
                <div className="mt-6 pt-4 border-t border-zinc-800/80 text-center">
                  <p className="text-xs text-zinc-500">
                    This request was <span className="font-bold uppercase">{selectedRequest.status}</span>. Actions locked.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex flex-col items-center justify-center text-center p-8 border border-zinc-900 bg-zinc-900/20 rounded-3xl min-h-[300px]">
              <p className="text-zinc-500 text-sm">Select any reservation request to view complete info and take action.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default StaffPortal;