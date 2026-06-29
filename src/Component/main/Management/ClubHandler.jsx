import React, { useState, useEffect } from 'react';

const ClubAdminHandler = () => {
    const [selectedTier, setSelectedTier] = useState("Elite Silver");
    const [tierData, setTierData] = useState({
        price: '',
        features: [''] // Shuruwat me kam se kam ek khali line dikhegi
    });
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    // 📥 1. Fetch Tier Data
    const fetchTierData = async (tierName) => {
        try {
            const response = await fetch(`${BASE_URL}/api/public/club/${tierName}`);
            if (response.ok) {
                const data = await response.json();
                
                // Agar database me features array khali ya null mile, toh kam se kam ek empty string rakhenge
                let loadedFeatures = data.features && data.features.length > 0 
                    ? [...data.features] 
                    : [''];
                
                setTierData({
                    price: data.price || '',
                    features: loadedFeatures
                });
            }
        } catch (error) {
            console.error("Error fetching tier details:", error);
        }
    };

    useEffect(() => {
        fetchTierData(selectedTier);
    }, [selectedTier]);

    // 🔄 Feature text change handler
    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...tierData.features];
        updatedFeatures[index] = value;
        setTierData({ ...tierData, features: updatedFeatures });
    };

    // ➕ Nayi Line Add Karne Ka Function
    const addFeatureLine = () => {
        setTierData({
            ...tierData,
            features: [...tierData.features, ''] // Array ke end me ek aur khali line jod dega
        });
    };

    // ➖ Kisi Specific Line Ko Hatane Ka Function
    const removeFeatureLine = (indexToRemove) => {
        // Agar sirf ek hi line bachi hai, toh use remove nahi karne denge (kam se kam ek input rehna chahiye)
        if (tierData.features.length <= 1) {
            handleFeatureChange(0, ''); // Bas use khali kar denge
            return;
        }
        const updatedFeatures = tierData.features.filter((_, index) => index !== indexToRemove);
        setTierData({ ...tierData, features: updatedFeatures });
    };

    // 📤 2. PUT CALL: Save to DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Sirf wahi features bhejenge jisme admin ne kuch likha ho (khali lines filter out ho jayengi)
        const filteredFeatures = tierData.features.filter(f => f.trim() !== '');

        const payload = {
            name: selectedTier,
            price: tierData.price,
            features: filteredFeatures
        };

        try {
            const response = await fetch(`${BASE_URL}/api/admin/club/${selectedTier}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert(`✨ ${selectedTier} Tier privileges saved successfully!`);
                fetchTierData(selectedTier); // Data fresh reload karlo
            } else {
                alert("Server error while saving tier features.");
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Backend server se connect nahi ho paya!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-6 p-2 sm:p-0 box-border text-white">
            <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-xl w-full box-border">
                
                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-purple-600/10 text-purple-400 rounded-lg text-lg sm:text-xl">
                        👑
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold">Club Aayam Dynamic Admin Desk</h3>
                        <p className="text-[11px] sm:text-xs text-zinc-500">Add or remove dynamic privilege lines instantly</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Tier Dropdown */}
                    <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Select Tier to Modify</label>
                        <select 
                            value={selectedTier}
                            onChange={(e) => setSelectedTier(e.target.value)}
                            className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-[#E2B747] text-sm cursor-pointer"
                        >
                            <option value="Elite Silver">🥈 Elite Silver (Card 1)</option>
                            <option value="Royal Gold">🥇 Royal Gold (Card 2)</option>
                            <option value="Imperial Platinum">💎 Imperial Platinum (Card 3)</option>
                        </select>
                    </div>

                    {/* Price Input */}
                    <div>
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1 tracking-wide">Membership Pricing text</label>
                        <input 
                            type="text"
                            placeholder="e.g., ₹25,000 / yr"
                            value={tierData.price}
                            onChange={(e) => setTierData({...tierData, price: e.target.value})}
                            className="w-full bg-black border border-zinc-800 p-2.5 sm:p-3 rounded-xl text-white outline-none focus:border-[#E2B747] text-sm"
                            required
                        />
                    </div>

                    {/* Dynamic Features List */}
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-1">
                            Tier Features Privileges ({tierData.features.length} Lines)
                        </label>
                        
                        {tierData.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 w-full animate-fadeIn">
                                <span className="text-[10px] text-zinc-600 font-mono w-5">#{index + 1}</span>
                                <input 
                                    type="text"
                                    placeholder={`Write privilege line details...`}
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    className="flex-1 bg-black border border-zinc-900 p-2 sm:p-2.5 rounded-xl text-xs text-zinc-300 outline-none focus:border-[#E2B747]"
                                />
                                {/* Remove/Delete current Line Button */}
                                <button 
                                    type="button"
                                    onClick={() => removeFeatureLine(index)}
                                    className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition text-xs font-bold"
                                    title="Delete line"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {/* ➕ ADD NEW LINE BUTTON */}
                        <div className="pt-1">
                            <button
                                type="button"
                                onClick={addFeatureLine}
                                className="flex items-center space-x-1.5 text-[11px] text-[#E2B747] hover:text-[#cdaf3f] font-bold bg-amber-500/5 hover:bg-amber-500/10 px-3 py-2 rounded-xl transition cursor-pointer border border-dashed border-[#E2B747]/30"
                            >
                                <span>➕</span>
                                <span>Add New Feature Line</span>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#E2B747] hover:bg-[#cdaf3f] text-black p-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all disabled:opacity-50 cursor-pointer shadow-lg mt-4"
                    >
                        {loading ? "Saving to Database..." : `Apply & Broadcast ${selectedTier} Changes`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClubAdminHandler;