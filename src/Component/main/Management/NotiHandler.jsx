import React, { useState, useEffect } from 'react';

const NotiHandler = () => {
    // Backend model se mapping perfect rakhne ke liye default keys exact rakhi hain
    const [notification, setNotification] = useState({ title: '', message: '', type: 'INFO' });
    const [liveNotifications, setLiveNotifications] = useState([]);
    const [editingId, setEditingId] = useState(null);
    
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    // 🟢 1. GET CALL: Check & Fetch from MongoDB via Backend
    const fetchLiveNotifications = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/public/notifications`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setLiveNotifications(data);
            } else {
                console.error("Backend returned error status code:", response.status);
            }
        } catch (error) {
            console.error("Error fetching live data from Atlas:", error);
        }
    };

    useEffect(() => {
        fetchLiveNotifications();
    }, []);

    // 🔵 2. POST / PUT CALL: Create or Update Document
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Agar editing mode hai toh ID parameters path pe jayega
            const url = editingId 
                ? `${BASE_URL}/api/public/notifications/${editingId}`
                : `${BASE_URL}/api/public/notifications`;
                
            const method = editingId ? 'PUT' : 'POST';

            // Agar edit ho raha hai toh database entity me mismatch na ho, isliye ID payload me bhi attach ki hai
            const payload = editingId 
                ? { id: editingId, ...notification }
                : notification;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert(editingId ? "Notification updated successfully!" : "Notification is live!");
                setNotification({ title: '', message: '', type: 'INFO' });
                setEditingId(null);
                fetchLiveNotifications(); // Fresh list reloading
            } else {
                const errText = await response.text();
                alert("Server Error: " + errText);
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Backend offline hai ya API route fail ho gaya!");
        }
    };

    // 🔴 3. DELETE CALL: Atlas Matrix Sync Permanent Delete
    const handleDelete = async (id) => {
        if (!id) {
            alert("Error: Valid Notification ID nahi mili!");
            return;
        }
        if (!window.confirm("Are You Sure Delete These Notification?")) return;
        
        try {
            const response = await fetch(`${BASE_URL}/api/public/notifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert("Notification deleted permanently!");
                fetchLiveNotifications(); // Sync database changes to UI immediately
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
    const startEdit = (notif) => {
        const targetId = notif.id || notif._id; // Fallback mapping secure check
        if (!targetId) return;
        
        setEditingId(targetId);
        setNotification({ 
            title: notif.title || '', 
            message: notif.message || '', 
            type: notif.type || 'INFO' 
        });
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Desktop/Mobile dynamic scrolling upward
    };

    return (
        <div className="w-full space-y-6 p-2 sm:p-0 box-border">
            
            {/* INPUT FORM CARD */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-xl w-full box-border">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-lg text-lg sm:text-xl">
                        🔔
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                            {editingId ? "✏️ Edit Notification" : "Notification Handler"}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-zinc-500">Push real-time alerts to the header</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Alert Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g., System Maintenance" 
                            value={notification.title}
                            onChange={e => setNotification({...notification, title: e.target.value})}
                            className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-indigo-500 text-sm box-border"
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Badge Type</label>
                        <select 
                            value={notification.type}
                            onChange={e => setNotification({...notification, type: e.target.value})}
                            className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-indigo-500 text-sm box-border"
                        >
                            <option value="INFO">🔵 Info / Update</option>
                            <option value="WARNING">🟡 Warning / Alert</option>
                            <option value="SUCCESS">🟢 Success / Announcement</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Message Description</label>
                        <textarea 
                            rows="3" 
                            placeholder="Write details about the notification..." 
                            value={notification.message}
                            onChange={e => setNotification({...notification, message: e.target.value})}
                            className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-indigo-500 text-sm resize-none box-border"
                            required 
                        />
                    </div>

                    <div className="flex gap-2">
                        {editingId && (
                            <button 
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setNotification({ title: '', message: '', type: 'INFO' });
                                }}
                                className="w-1/3 bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                        )}
                        <button 
                            type="submit" 
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-lg"
                        >
                            {editingId ? "Save Changes" : "Push Notification Live"}
                        </button>
                    </div>
                </form>
            </div>

            {/* LIVE MANAGEMENT CARD */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-xl w-full box-border">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-900 pb-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm sm:text-base">📋</span>
                        <h3 className="text-sm sm:text-base font-bold text-white">Live Broadcast Manager</h3>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full">
                        {liveNotifications.length} Active
                    </span>
                </div>

                {/* Mobile view structure */}
                <div className="block sm:hidden space-y-3">
                    {liveNotifications.length === 0 ? (
                        <p className="text-xs text-zinc-600 text-center py-4">No live alerts found.</p>
                    ) : (
                        liveNotifications.map((notif) => {
                            const currentId = notif.id || notif._id;
                            return (
                                <div key={currentId} className="bg-black border border-zinc-900 p-3 rounded-xl space-y-2">
                                    <div className="flex justify-between items-start">
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                                            notif.type === 'WARNING' ? 'bg-amber-500/10 text-amber-400' :
                                            notif.type === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400' :
                                            'bg-blue-500/10 text-blue-400'
                                        }`}>{notif.type}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => startEdit(notif)} className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">Edit</button>
                                            <button onClick={() => handleDelete(currentId)} className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">Del</button>
                                        </div>
                                    </div>
                                    <h4 className="text-xs font-bold text-zinc-200 truncate">{notif.title}</h4>
                                    <p className="text-[11px] text-zinc-500 line-clamp-2 leading-tight">{notif.message}</p>
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
                                <th className="pb-2">Type</th>
                                <th className="pb-2">Title</th>
                                <th className="pb-2">Message</th>
                                <th className="pb-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/60">
                            {liveNotifications.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-zinc-600 font-light text-xs">No live notifications broadcasting.</td>
                                </tr>
                            ) : (
                                liveNotifications.map((notif) => {
                                    const currentId = notif.id || notif._id;
                                    return (
                                        <tr key={currentId} className="hover:bg-zinc-900/20 transition-all text-zinc-300">
                                            <td className="py-3">
                                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                                    notif.type === 'WARNING' ? 'bg-amber-500/10 text-amber-400' :
                                                    notif.type === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400' :
                                                    'bg-indigo-500/10 text-indigo-400'
                                                }`}>{notif.type}</span>
                                            </td>
                                            <td className="py-3 font-semibold text-zinc-100 max-w-[120px] truncate pr-2" title={notif.title}>{notif.title}</td>
                                            <td className="py-3 text-zinc-400 max-w-[220px] truncate pr-2" title={notif.message}>{notif.message}</td>
                                            <td className="py-3 text-center whitespace-nowrap">
                                                <button onClick={() => startEdit(notif)} className="text-xs text-indigo-400 hover:text-indigo-300 font-bold bg-indigo-500/5 hover:bg-indigo-500/10 px-2.5 py-1 rounded-lg transition mr-2">
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

export default NotiHandler;