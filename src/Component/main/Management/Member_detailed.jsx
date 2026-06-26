import React, { useState, useEffect } from 'react';

const Member_detailed = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModalPassword, setShowModalPassword] = useState(false);
    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchMembers();
    }, []);

    // 1. Fetch All Members
    const fetchMembers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/all`);
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    // 2. Open Edit Modal
    const handleEdit = (member) => {
        setSelectedMember({ ...member }); 
        setShowModalPassword(false);
        setIsModalOpen(true);
    };

    // 3. FIXED: Update Member (Headers & Body strictly handled to avoid 415/500 errors)
    const handleUpdate = async () => {
        try {
            // Sirf wahi fields bhej rahe hain jo backend ko chahiye, extra system variables nahi
            const payload = {
                id: selectedMember.id,
                name: selectedMember.name,
                email: selectedMember.email,
                phone: selectedMember.phone,
                dob: selectedMember.dob,
                address: selectedMember.address,
                pinCode: selectedMember.pinCode,
                identityNo: selectedMember.identityNo,
                password: selectedMember.password
            };

            const response = await fetch(`${BASE_URL}/api/auth/update/${selectedMember.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', // Fixes 415 error
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload) // Clean payload fixes 500 error
            });

            if (response.ok) {
                alert("Member Updated Successfully!");
                setIsModalOpen(false);
                fetchMembers(); 
            } else {
                const errText = await response.text();
                alert("Update failed: " + errText);
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Something went wrong during update!");
        }
    };

    // 4. Delete Member
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                const response = await fetch(`${BASE_URL}/api/auth/delete/${id}`, { 
                    method: 'DELETE' 
                });
                if (response.ok) {
                    alert("Member Deleted Successfully!");
                    fetchMembers(); 
                }
            } catch (err) {
                console.error("Delete Error:", err);
            }
        }
    };

    return (
        <div className="p-3 sm:p-6 text-black bg-gray-300 min-h-screen box-border">
            <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wider text-gray-800">Member Details</h2>
            
            {/* MOBILE VIEW: Cards (No Whitespace / Hydration Issue here) */}
            <div className="block sm:hidden space-y-4">
                {members.length === 0 ? (
                    <div className="bg-white p-4 rounded-xl text-center text-gray-500">No members available.</div>
                ) : (
                    members.map((m) => (
                        <div key={m.id} className="bg-white p-4 rounded-xl shadow border border-gray-200 space-y-2">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="font-bold text-base text-gray-900">{m.name}</span>
                                <span className="bg-purple-100 text-purple-800 text-[11px] px-2 py-0.5 rounded font-bold uppercase">Member</span>
                            </div>
                            <div className="text-sm space-y-1">
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">Email:</span> {m.email}</p>
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">Phone:</span> {m.phone}</p>
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">DOB:</span> {m.dob || 'N/A'}</p>
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">Address:</span> {m.address}</p>
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">Pin Code:</span> {m.pinCode}</p>
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">Identity No:</span> {m.identityNo}</p>
                                <div className="mt-2 bg-gray-100 p-2 rounded-lg flex items-center justify-between border border-gray-200">
                                    <span className="text-xs font-semibold text-gray-500">Password:</span>
                                    <span className="font-mono text-xs font-bold text-gray-800 select-all">{m.password}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2 border-t mt-3">
                                <button onClick={() => handleEdit(m)} className="flex-1 bg-blue-500 text-white text-center py-2 rounded-xl text-sm font-medium">Edit</button>
                                <button onClick={() => handleDelete(m.id)} className="flex-1 bg-red-500 text-white text-center py-2 rounded-xl text-sm font-medium">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* DESKTOP VIEW: Fixed Strict HTML formatting to prevent Hydration Errors */}
            <div className="hidden sm:block overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-lg">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-gray-800 text-white border-b">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">DOB</th>
                            <th className="p-3 text-left">Address</th>
                            <th className="p-3 text-left">Pin Code</th>
                            <th className="p-3 text-left">Identity No.</th>
                            <th className="p-3 text-left">Password</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>{members.length === 0 ? (<tr><td colSpan="9" className="p-4 text-center text-gray-500 bg-gray-50">No members found.</td></tr>) : (members.map((m) => (<tr key={m.id} className="border-b hover:bg-gray-50 transition"><td className="p-3 font-bold text-gray-900">{m.name}</td><td className="p-3 text-gray-600">{m.email}</td><td className="p-3 text-gray-600 font-medium">{m.phone}</td><td className="p-3 text-gray-600 whitespace-nowrap">{m.dob || 'N/A'}</td><td className="p-3 text-gray-600 max-w-xs truncate" title={m.address}>{m.address}</td><td className="p-3 text-gray-500 font-mono">{m.pinCode}</td><td className="p-3 text-gray-600">{m.identityNo}</td><td className="p-3 font-mono text-sm text-gray-800 bg-gray-50/50 font-bold select-all">{m.password}</td><td className="p-3 text-center whitespace-nowrap"><button onClick={() => handleEdit(m)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg transition mr-2 text-sm">Edit</button><button onClick={() => handleDelete(m.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition text-sm">Del</button></td></tr>)))}</tbody>
                </table>
            </div>

            {/* EDIT MODAL: Extreme Layout with Touch Target Adjustments */}
            {isModalOpen && selectedMember && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto box-border">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Edit Member Details</h2>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                                <input className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none text-sm" value={selectedMember.name || ''} onChange={e => setSelectedMember({...selectedMember, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                                <input className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none text-sm" value={selectedMember.phone || ''} onChange={e => setSelectedMember({...selectedMember, phone: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                                <input className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none text-sm" value={selectedMember.address || ''} onChange={e => setSelectedMember({...selectedMember, address: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">DOB</label>
                                <input type="date" className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none text-sm" value={selectedMember.dob || ''} onChange={e => setSelectedMember({...selectedMember, dob: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pin Code</label>
                                <input className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none text-sm" value={selectedMember.pinCode || ''} onChange={e => setSelectedMember({...selectedMember, pinCode: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Identity No</label>
                                <input className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none text-sm" value={selectedMember.identityNo || ''} onChange={e => setSelectedMember({...selectedMember, identityNo: e.target.value})} />
                            </div>
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                                <input 
                                    type={showModalPassword ? "text" : "password"} 
                                    className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none pr-12 font-mono text-sm" 
                                    value={selectedMember.password || ''} 
                                    onChange={e => setSelectedMember({...selectedMember, password: e.target.value})} 
                                />
                                <button type="button" onClick={() => setShowModalPassword(!showModalPassword)} className="absolute right-3 bottom-3 text-xs uppercase font-bold text-blue-600">
                                    {showModalPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold text-sm">Cancel</button>
                            <button onClick={handleUpdate} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold text-sm">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Member_detailed;