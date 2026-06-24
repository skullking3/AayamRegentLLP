import React, { useState, useEffect } from 'react';

const Member_detailed = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/all`);
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    const handleEdit = (member) => {
        setSelectedMember({ ...member }); // Spread operator use kiya taki original state change na ho
        setIsModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/update/${selectedMember.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedMember)
            });

            if (response.ok) {
                alert("Updated Successfully!");
                setIsModalOpen(false);
                fetchMembers(); // Page refresh ki jagah data re-fetch kar rahe hain (Faster)
            }
        } catch (error) {
            alert("Update failed!");
        }
    };
   const handleDelete = async (id) => { // id as a parameter
    if (window.confirm("Sure to delete?")) {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/delete/${id}`, { 
                method: 'DELETE' 
            });
            if (response.ok) {
                alert("Deleted Successfully!");
                fetchMembers(); // State update karne ke liye re-fetch karo
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }
};

    return (
        <div className="p-4 md:p-6 text-black bg-gray-300 min-h-screen">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Member Details</h2>
            
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-gray-100 border-b">
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
                    <tbody>
                        {members.map((m) => (
                            <tr key={m.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{m.name}</td>
                                <td className="p-3">{m.email}</td>
                                <td className="p-3">{m.phone}</td>
                                <td className="p-3">{m.dob}</td>
                                <td className="p-3">{m.address}</td>
                                <td className="p-3">{m.pinCode}</td>
                                <td className="p-3">{m.identityNo}</td>
                                <td className="p-3">{m.password}</td>
                                <td className="p-3 text-center">
                                    <button onClick={() => handleEdit(m)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition">Edit</button>
                                    <button onClick={() => handleDelete(m.id)} className="bg-red-500 hover:bg-red-600 text-black px-2 py-1 m-2 rounded">Del</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Edit Member Details</h2>
                        
                        <label className="block text-xs font-semibold mb-1">Name</label>
                        <input className="w-full p-2 border rounded mb-3" value={selectedMember.name || ''} onChange={e => setSelectedMember({...selectedMember, name: e.target.value})} />
                        
                        <label className="block text-xs font-semibold mb-1">Phone</label>
                        <input className="w-full p-2 border rounded mb-3" value={selectedMember.phone || ''} onChange={e => setSelectedMember({...selectedMember, phone: e.target.value})} />
                        
                        <label className="block text-xs font-semibold mb-1">Address</label>
                        <input className="w-full p-2 border rounded mb-3" value={selectedMember.address || ''} onChange={e => setSelectedMember({...selectedMember, address: e.target.value})} />
                        
                        <label className="block text-xs font-semibold mb-1">DOB</label>
                        <input type="date" className="w-full p-2 border rounded mb-3" value={selectedMember.dob || ''} onChange={e => setSelectedMember({...selectedMember, dob: e.target.value})} />
                        
                        <label className="block text-xs font-semibold mb-1">Pin Code</label>
                        <input className="w-full p-2 border rounded mb-3" value={selectedMember.pinCode || ''} onChange={e => setSelectedMember({...selectedMember, pinCode: e.target.value})} />
                        
                        <label className="block text-xs font-semibold mb-1">Identity No</label>
                        <input className="w-full p-2 border rounded mb-4" value={selectedMember.identityNo || ''} onChange={e => setSelectedMember({...selectedMember, identityNo: e.target.value})} />

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Member_detailed;