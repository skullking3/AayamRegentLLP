import React, { useState } from 'react';

const Member_registration = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '',
        dob: '', address: '', pinCode: '', identityNo: '',
        agreementUrl: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [uploading, setUploading] = useState(false); 

    const BASE_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        
        if (file.type !== "application/pdf") {
            alert("Bhai, sirf PDF format allowed hai!");
            e.target.value = "";
            return;
        }

        const dataPayload = new FormData();
        dataPayload.append("file", file); 

        try {
            setUploading(true);
            
         
            const uploadResponse = await fetch(`${BASE_URL}/api/documents/upload`, {
                method: 'POST',
                body: dataPayload
            });

            if (!uploadResponse.ok) throw new Error("Cloud asset storage pipeline rejected.");
            
            const resultData = await uploadResponse.json();
            const supabasePublicUrl = resultData.url;

            if (supabasePublicUrl) {
                // Updating target form reference context with the generated link
                setFormData(prev => ({ ...prev, agreementUrl: supabasePublicUrl }));
                alert("Mubarak ho! Document cloud me save ho gaya aur form se link ho chuka hai.");
            }
        } catch (error) {
            console.error("Asset Sync Mismatch Error Trace:", error);
            alert("Pipeline server integration error! Live console stream check karein.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Registration Successful with Signed Agreement Asset!");
                setFormData({ 
                    name: '', email: '', password: '', phone: '', 
                    dob: '', address: '', pinCode: '', identityNo: '', 
                    agreementUrl: '' 
                });
                e.target.reset();
            } else {
                const errorText = await response.text();
                alert("Error: " + errorText);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-3 sm:p-6 md:p-8 box-border select-none">
            {/* Premium Glassmorphic Outer Card */}
            <div className="bg-black p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-zinc-800 w-full max-w-2xl box-border">
                
                <div className="text-center mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
                        Member Registration
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">Create a secure system user account with signed policy infrastructure</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Extreme Responsive Grid: Mobile 1 column, Desktop 2 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 box-border">
                        
                        {/* Full Name */}
                        <div className="w-full">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">Full Name</label>
                            <input 
                                name="name" 
                                type="text"
                                autoComplete="name"
                                value={formData.name}
                                placeholder="Full Name" 
                                onChange={handleChange} 
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border text-sm sm:text-base" 
                                required 
                            />
                        </div>

                        {/* Email Address */}
                        <div className="w-full">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">Email Address</label>
                            <input 
                                name="email" 
                                type="email" 
                                autoComplete="email"
                                value={formData.email}
                                placeholder="New@gmail.com" 
                                onChange={handleChange} 
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border text-sm sm:text-base" 
                                required 
                            />
                        </div>

                        {/* Password Field with Advanced Hide/Show */}
                        <div className="w-full relative">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">Password</label>
                            <div className="relative w-full">
                                <input 
                                    name="password" 
                                    type={showPassword ? "text" : "password"} 
                                    autoComplete="new-password"
                                    value={formData.password}
                                    placeholder="••••••••••••" 
                                    onChange={handleChange} 
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 pr-12 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border font-mono text-sm sm:text-base" 
                                    required 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-zinc-400 hover:text-white uppercase font-extrabold tracking-wider"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Number */}
                        <div className="w-full">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">Mobile Number</label>
                            <input 
                                name="phone" 
                                type="tel"
                                autoComplete="tel"
                                value={formData.phone}
                                placeholder="+91 9876543210" 
                                onChange={handleChange} 
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border text-sm sm:text-base" 
                                required 
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="w-full">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">Date of Birth</label>
                            <input 
                                type="date" 
                                name="dob" 
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border uppercase text-sm sm:text-base min-h-[46px]"
                                required 
                            />
                        </div>

                        {/* Pin Code */}
                        <div className="w-full">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">Pin Code</label>
                            <input 
                                name="pinCode" 
                                type="text" 
                                inputMode="numeric"
                                autoComplete="postal-code"
                                value={formData.pinCode}
                                placeholder="112233" 
                                onChange={handleChange} 
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border text-sm sm:text-base" 
                                required 
                            />
                        </div>

                        {/* Identity No */}
                        <div className="w-full sm:col-span-2">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">Identity No (Aadhar/PAN)</label>
                            <input 
                                name="identityNo" 
                                type="text"
                                autoComplete="username"
                                value={formData.identityNo}
                                placeholder="Enter Identity No." 
                                onChange={handleChange} 
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border text-sm sm:text-base" 
                                required 
                            />
                        </div>

                        {/* Address */}
                        <div className="w-full sm:col-span-2">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">Full Address</label>
                            <textarea 
                                name="address" 
                                rows="2"
                                autoComplete="street-address"
                                value={formData.address}
                                placeholder="Enter full street, city, state address" 
                                onChange={handleChange} 
                                className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border text-sm sm:text-base resize-none" 
                                required 
                            />
                        </div>

                        <div className="w-full sm:col-span-2">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">
                                Upload Legal Digital Agreement (PDF Format)
                            </label>
                            <div className="relative w-full flex items-center justify-between gap-3 bg-zinc-950 border border-zinc-800 p-2.5 rounded-xl text-white focus-within:border-[#E2B747] transition-all box-border">
                                <label className="bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white text-xs px-4 py-2 font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap">
                                    {uploading ? "Uploading..." : "📁 Choose PDF"}
                                    <input 
                                        type="file" 
                                        accept=".pdf" 
                                        onChange={handleFileChange} 
                                        disabled={uploading} 
                                        className="hidden" 
                                    />
                                </label>
                                
                                <div className="text-xs font-mono text-zinc-500 truncate pr-2 max-w-[70%]">
                                    {formData.agreementUrl ? (
                                        <span className="text-emerald-400 font-bold truncate block">
                                            🟢 Linked: {formData.agreementUrl}
                                        </span>
                                    ) : (
                                        <span>No file stream registered yet</span>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    {/* Submit Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={uploading}
                            className={`w-full ${uploading ? 'bg-zinc-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} active:scale-[0.99] text-white p-3.5 rounded-xl font-bold tracking-wide shadow-lg transition-all text-sm sm:text-base cursor-pointer`}
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Member_registration;