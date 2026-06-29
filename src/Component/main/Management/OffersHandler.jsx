import React, { useState, useEffect } from 'react';

const OffersHandler = () => {
    // Default keys matching exact Spring Boot Offer model fields
    const [offer, setOffer] = useState({ tag: '', title: '', desc: '', btnText: '' });
    const [liveOffers, setLiveOffers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const BASE_URL = import.meta.env.VITE_API_URL;

    const fetchLiveOffers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/public/offers`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setLiveOffers(data);
            } else {
                console.error("Backend returned error status code:", response.status);
            }
        } catch (error) {
            console.error("Error fetching live data from Atlas:", error);
        }
    };

    useEffect(() => {
        fetchLiveOffers();
    }, []);

    // 🔵 2. POST / PUT CALL: Create or Update Offer Document
    // PUT call ke liye endpoint format standard rakha hai, agar aapka backend direct path id consume karta hai
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId 
                ? `${BASE_URL}/api/public/update/${editingId}` // For Update
                : `${BASE_URL}/api/public/create`;            // For Create
                
            const method = editingId ? 'PUT' : 'POST';

            // Payload structure matching backend mapping fields
            const payload = editingId 
                ? { id: editingId, ...offer }
                : offer;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert(editingId ? "Offer updated successfully!" : "Offer is now live in slider!");
                setOffer({ tag: '', title: '', desc: '', btnText: '' });
                setEditingId(null);
                fetchLiveOffers(); 
            } else {
                const errText = await response.text();
                alert("Server Error: " + errText);
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Backend offline!");
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            alert("Error: Valid Offer ID nahi mili!");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this offer?")) return;
        
        try {
            const response = await fetch(`${BASE_URL}/api/offers/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert("Offer deleted permanently from Atlas!");
                fetchLiveOffers(); // Sync dynamic UI immediately
            } else {
                const errText = await response.text();
                alert("Delete failed on server: " + errText);
            }
        } catch (error) {
            console.error("Delete Endpoint Error:", error);
            alert("Network connection error during deletion.");
        }
    };

    // 🟡 4. State Hydration for Edit Mode
    const startEdit = (item) => {
        const targetId = item.id || item._id;
        if (!targetId) return;
        
        setEditingId(targetId);
        setOffer({ 
            tag: item.tag || '', 
            title: item.title || '', 
            desc: item.desc || '', 
            btnText: item.btnText || '' 
        });
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll back to form view
    };

    return (
        <div className="w-full space-y-6 p-2 sm:p-0 box-border">
            
            {/* INPUT FORM CARD */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-xl w-full box-border">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-amber-600/10 text-[#E2B747] rounded-lg text-lg sm:text-xl">
                        🎁
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                            {editingId ? "✏️ Edit Resort Offer" : "Offers Management Handler"}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-zinc-500">Manage dynamic resort deals and package cards</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Gold Tag / Label</label>
                            <input 
                                type="text" 
                                placeholder="e.g., Exclusive Deal, Limited Offer" 
                                value={offer.tag}
                                onChange={e => setOffer({...offer, tag: e.target.value})}
                                className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-[#E2B747] text-sm box-border"
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Offer Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g., Goa Beach Escape" 
                                value={offer.title}
                                onChange={e => setOffer({...offer, title: e.target.value})}
                                className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-[#E2B747] text-sm box-border"
                                required 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Action Button Text</label>
                        <input 
                            type="text" 
                            placeholder="e.g., Book Goa Stay, Claim Offer" 
                            value={offer.btnText}
                            onChange={e => setOffer({...offer, btnText: e.target.value})}
                            className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-[#E2B747] text-sm box-border"
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Deal Description Description</label>
                        <textarea 
                            rows="3" 
                            placeholder="Write complete details about the offer packages..." 
                            value={offer.desc}
                            onChange={e => setOffer({...offer, desc: e.target.value})}
                            className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-[#E2B747] text-sm resize-none box-border"
                            required 
                        />
                    </div>

                    <div className="flex gap-2">
                        {editingId && (
                            <button 
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setOffer({ tag: '', title: '', desc: '', btnText: '' });
                                }}
                                className="w-1/3 bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                        )}
                        <button 
                            type="submit" 
                            className="flex-1 bg-[#E2B747] hover:bg-[#cdaf3f] text-black p-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-lg"
                        >
                            {editingId ? "Save Changes" : "Publish Offer to Dashboard"}
                        </button>
                    </div>
                </form>
            </div>

            {/* LIVE MANAGEMENT CARD */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-xl w-full box-border">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-900 pb-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm sm:text-base">📋</span>
                        <h3 className="text-sm sm:text-base font-bold text-white">Live Offers Broadcast Manager</h3>
                    </div>
                    <span className="text-[10px] font-mono text-[#E2B747] bg-amber-500/10 px-2 py-0.5 rounded-full">
                        {liveOffers.length} Active
                    </span>
                </div>

                {/* Mobile Responsive Layout Card Grid */}
                <div className="block sm:hidden space-y-3">
                    {liveOffers.length === 0 ? (
                        <p className="text-xs text-zinc-600 text-center py-4">No live resort deals found.</p>
                    ) : (
                        liveOffers.map((item) => {
                            const currentId = item.id || item._id;
                            return (
                                <div key={currentId} className="bg-black border border-zinc-900 p-3 rounded-xl space-y-2">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-amber-500/10 text-[#E2B747] uppercase">
                                            {item.tag}
                                        </span>
                                        <div className="flex gap-2">
                                            <button onClick={() => startEdit(item)} className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">Edit</button>
                                            <button onClick={() => handleDelete(currentId)} className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">Del</button>
                                        </div>
                                    </div>
                                    <h4 className="text-xs font-bold text-zinc-200 truncate">{item.title}</h4>
                                    <p className="text-[11px] text-zinc-500 line-clamp-2 leading-tight">{item.desc}</p>
                                    <div className="text-[10px] text-zinc-400 font-mono italic">Button: {item.btnText}</div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Desktop View Table Structure */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-900 text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                                <th className="pb-2">Tag</th>
                                <th className="pb-2">Title</th>
                                <th className="pb-2">Description Details</th>
                                <th className="pb-2">Button Action</th>
                                <th className="pb-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/60">
                            {liveOffers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-zinc-600 font-light text-xs">No live active offers broadcasting.</td>
                                </tr>
                            ) : (
                                liveOffers.map((item) => {
                                    const currentId = item.id || item._id;
                                    return (
                                        <tr key={currentId} className="hover:bg-zinc-900/20 transition-all text-zinc-300">
                                            <td className="py-3">
                                                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-500/10 text-[#E2B747]">
                                                    {item.tag}
                                                </span>
                                            </td>
                                            <td className="py-3 font-semibold text-zinc-100 max-w-[120px] truncate pr-2" title={item.title}>{item.title}</td>
                                            <td className="py-3 text-zinc-400 max-w-[250px] truncate pr-2" title={item.desc}>{item.desc}</td>
                                            <td className="py-3 text-zinc-400 font-mono text-[11px]">{item.btnText}</td>
                                            <td className="py-3 text-center whitespace-nowrap">
                                                <button onClick={() => startEdit(item)} className="text-xs text-indigo-400 hover:text-indigo-300 font-bold bg-indigo-500/5 hover:bg-indigo-500/10 px-2.5 py-1 rounded-lg transition mr-2">
                                                    Update
                                                </button>
                                                <button onClick={() => handleDelete(currentId)} className="text-xs text-red-400 hover:text-red-300 font-bold bg-red-500/5 hover:bg-red-500/10 px-2.5 py-1 rounded-lg transition">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default OffersHandler;