import React, { useState, useEffect } from 'react';
import AgreementModal from '../Login/AggrementModel.jsx'; 

const Member_detailed = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModalPassword, setShowModalPassword] = useState(false);
    
    // Digital document view management states
    const [showAgreementModal, setShowAgreementModal] = useState(false);
    const [selectedAgreementUrl, setSelectedAgreementUrl] = useState("");
    const [uploading, setUploading] = useState(false);

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

    // 3. Update Member (Handles standard data + freshly uploaded agreement url)
    const handleUpdate = async () => {
        try {
            const payload = {
                id: selectedMember.id,
                name: selectedMember.name,
                email: selectedMember.email,
                phone: selectedMember.phone,
                dob: selectedMember.dob,
                address: selectedMember.address,
                pinCode: selectedMember.pinCode,
                identityNo: selectedMember.identityNo,
                password: selectedMember.password,
                agreementUrl: selectedMember.agreementUrl // Sends the updated cloud link
            };

            const response = await fetch(`${BASE_URL}/api/auth/update/${selectedMember.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload) 
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

    // ─── 🚀 AUTO-DELETE + UPLOAD: Purani file automatic delete hogi Supabase se ───
    const handleInlineModalUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Bhai, sirf PDF format allowed hai!");
            e.target.value = "";
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert("File size 10MB se kam honi chahiye!");
            e.target.value = "";
            return;
        }

        try {
            setUploading(true);

            // 🔥 STEP 1: Purani file ko Supabase se DELETE karo
            const oldUrl = selectedMember.agreementUrl;
            
            if (oldUrl && 
                oldUrl.trim() !== "" && 
                oldUrl !== "null" && 
                oldUrl !== "undefined" &&
                oldUrl.includes('supabase.co')) {
                
                console.log("🗑️ Deleting old agreement from Supabase:", oldUrl);
                
                try {
                    const deleteResponse = await fetch(`${BASE_URL}/api/documents/delete`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({ url: oldUrl })
                    });

                    const deleteResult = await deleteResponse.json();
                    
                    if (deleteResponse.ok && deleteResult.success) {
                        console.log("✅ Old file deleted successfully from Supabase");
                    } else {
                        console.warn("⚠️ Old file deletion warning:", deleteResult.error || 'Unknown error');
                    }
                } catch (delErr) {
                    console.warn("⚠️ Delete request failed, continuing with upload:", delErr);
                    // Delete fail hone par bhi upload block nahi karenge
                }
            } else {
                console.log("ℹ️ No existing agreement file to delete");
            }
            
            // 🔥 STEP 2: Naya file Supabase me UPLOAD karo
            console.log("📤 Uploading new agreement file...");
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch(`${BASE_URL}/api/documents/upload`, {
                method: 'POST',
                body: formData
            });

            if (!uploadRes.ok) {
                const errorData = await uploadRes.json().catch(() => ({}));
                throw new Error(errorData.error || `Upload failed with status: ${uploadRes.status}`);
            }
            
            const uploadData = await uploadRes.json();
            const newFileUrl = uploadData.url;

            if (newFileUrl) {
                console.log("✅ New file uploaded successfully:", newFileUrl);
                
                // 🔥 STEP 3: Local state update karo naye URL ke saath
                setSelectedMember(prev => ({ 
                    ...prev, 
                    agreementUrl: newFileUrl 
                }));
                
                alert("✅ Agreement updated successfully!\n\n🔴 Old file deleted from cloud\n🟢 New file uploaded\n💾 Click 'Save Changes' to finalize");
            } else {
                throw new Error("Upload response missing URL");
            }
        } catch (err) {
            console.error("❌ Upload Process Error:", err);
            alert("Upload failed: " + err.message);
        } finally {
            setUploading(false);
            e.target.value = ""; // Reset file input
        }
    };

    // Live preview trigger handler config
    const handleOpenAgreement = (url) => {
        if (!url || url.trim() === "" || url === 'null' || url === 'undefined') {
            alert("No agreement document available for this member.");
            return;
        }
        
        // Validate URL format
        try {
            new URL(url);
            setSelectedAgreementUrl(url);
            setShowAgreementModal(true);
        } catch (e) {
            alert("Invalid agreement URL format.");
            console.error("Invalid URL:", url);
        }
    };

    // Close modal handler with upload check
    const handleCloseModal = () => {
        if (uploading) {
            alert("Please wait for upload to complete!");
            return;
        }
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    return (
        <div className="p-3 sm:p-6 text-black bg-gray-300 min-h-screen box-border">
            <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wider text-gray-800">Member Details</h2>
            
            {uploading && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-mono px-4 py-2.5 rounded-xl shadow-2xl z-[60] animate-pulse">
                    ⚡ Processing: Deleting old file & uploading new agreement...
                </div>
            )}

            {/* MOBILE VIEW: Cards */}
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
                                
                                <div className="py-1 flex items-center justify-between text-xs">
                                    <span className="font-semibold text-gray-500">Agreement Asset:</span>
                                    {m.agreementUrl ? (
                                        <button onClick={() => handleOpenAgreement(m.agreementUrl)} className="text-emerald-600 hover:underline font-bold font-mono">🟢 Linked (View)</button>
                                    ) : (
                                        <span className="text-amber-600 font-bold font-mono">🔴 Pending</span>
                                    )}
                                </div>
                                
                                <div className="mt-2 bg-gray-100 p-2 rounded-lg flex items-center justify-between border border-gray-200">
                                    <span className="text-xs font-semibold text-gray-500">Password:</span>
                                    <span className="font-mono text-xs font-bold text-gray-800 select-all">{m.password}</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 pt-2 border-t mt-3">
                                <button onClick={() => handleEdit(m)} className="bg-blue-500 text-white text-center py-2 rounded-xl text-xs font-medium">Edit</button>
                                <button onClick={() => handleDelete(m.id)} className="bg-red-500 text-white text-center py-2 rounded-xl text-xs font-medium">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* DESKTOP VIEW */}
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
                            <th className="p-3 text-center">Agreement</th> 
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length === 0 ? (
                            <tr><td colSpan="10" className="p-4 text-center text-gray-500 bg-gray-50">No members found.</td></tr>
                        ) : (
                            members.map((m) => (
                                <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3 font-bold text-gray-900">{m.name}</td>
                                    <td className="p-3 text-gray-600">{m.email}</td>
                                    <td className="p-3 text-gray-600 font-medium">{m.phone}</td>
                                    <td className="p-3 text-gray-600 whitespace-nowrap">{m.dob || 'N/A'}</td>
                                    <td className="p-3 text-gray-600 max-w-xs truncate" title={m.address}>{m.address}</td>
                                    <td className="p-3 text-gray-500 font-mono">{m.pinCode}</td>
                                    <td className="p-3 text-gray-600">{m.identityNo}</td>
                                    <td className="p-3 font-mono text-sm text-gray-800 bg-gray-50/50 font-bold select-all">{m.password}</td>
                                    
                                    <td className="p-3 text-center whitespace-nowrap text-xs font-mono">
                                        {m.agreementUrl ? (
                                            <button type="button" onClick={() => handleOpenAgreement(m.agreementUrl)} className="text-emerald-600 hover:text-emerald-700 font-bold underline">
                                                🟢 View Doc
                                            </button>
                                        ) : (
                                            <span className="text-amber-600 font-semibold">🔴 Missing</span>
                                        )}
                                    </td>

                                    <td className="p-3 text-center whitespace-nowrap flex items-center justify-center gap-1.5">
                                        <button onClick={() => handleEdit(m)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition text-sm">Edit</button>
                                        <button onClick={() => handleDelete(m.id)} className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg transition text-sm">Del</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* EDIT MODAL WITH INTEGRATED FILE UPLOADER */}
            {isModalOpen && selectedMember && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto box-border">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-xl font-bold text-gray-800">Edit Member Details</h2>
                            <button 
                                onClick={handleCloseModal}
                                disabled={uploading}
                                className="text-gray-500 hover:text-gray-700 text-2xl disabled:opacity-50"
                            >
                                ✕
                            </button>
                        </div>
                        
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

                            {/* ─── 📁 AUTO-DELETE + UPLOAD SECTION ─── */}
                            <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl mt-4">
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Agreement Document Status</label>
                                
                                {/* Current Status Display */}
                                <div className="text-xs font-mono text-gray-500 mb-3 bg-white p-2 rounded-lg border border-gray-300">
                                    {selectedMember.agreementUrl ? (
                                        <div>
                                            <div className="text-emerald-600 font-bold mb-1">🟢 Current Document:</div>
                                            <div className="text-xs break-all text-gray-600">{selectedMember.agreementUrl}</div>
                                        </div>
                                    ) : (
                                        <span className="text-amber-600 font-semibold block">🔴 No Document Attached</span>
                                    )}
                                </div>
                                
                                {/* Upload Button with Auto-Delete Functionality */}
                                <label className={`
                                    w-full text-white text-xs py-3 px-4 rounded-xl font-bold transition-all 
                                    inline-flex items-center justify-center cursor-pointer gap-2
                                    ${uploading 
                                        ? 'bg-gray-500 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700'
                                    }
                                `}>
                                    {uploading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Processing... (Auto-delete + Upload)
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-lg">🔄</span>
                                            <span>Re-upload / Update PDF</span>
                                            <span className="text-xs opacity-75">(Old file auto-deletes)</span>
                                        </>
                                    )}
                                    <input 
                                        type="file" 
                                        accept=".pdf,application/pdf" 
                                        onChange={handleInlineModalUpload} 
                                        disabled={uploading} 
                                        className="hidden" 
                                    />
                                </label>
                                
                                {/* Info Text */}
                                <p className="text-[10px] text-gray-500 mt-2 text-center">
                                    ⚡ Selecting new file will automatically delete old file from cloud storage
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button 
                                onClick={handleCloseModal} 
                                disabled={uploading}
                                className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-300 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleUpdate} 
                                disabled={uploading} 
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50"
                            >
                                {uploading ? 'Please wait...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SHARED LICENSE MODAL PREVIEW */}
            {showAgreementModal && (
                <AgreementModal 
                    documentUrl={selectedAgreementUrl} 
                    onClose={() => {
                        setShowAgreementModal(false);
                        setSelectedAgreementUrl("");
                    }} 
                />
            )}
        </div>
    );
};

export default Member_detailed;