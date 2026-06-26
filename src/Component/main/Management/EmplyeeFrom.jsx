import React, { useState } from 'react';

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    empId: '', name: '', email: '', password: '', role: '', identityNo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/emp/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Employee Added Successfully!");
        setFormData({ empId: '', name: '', username: '', password: '', role: '', identityNo: '' });
        if (onEmployeeAdded) onEmployeeAdded();
      } else {
        alert("Error saving data.");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    // 'px-4' aur 'box-border' ensures mobile pe card screen se chipke na aur cut na ho
    <div className="w-full max-w-md mx-auto bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 p-4 sm:p-6 rounded-2xl shadow-xl mt-6 box-border">
      <h2 className="text-xl text-white font-serif mb-6 uppercase tracking-widest text-center">Add New Employee</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* 1. Emp ID */}
        <div className="w-full">
          <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Emp-ID</label>
          <input 
            type="text" 
            name="empId" 
            required 
            value={formData.empId} 
            onChange={handleInputChange} 
            autoComplete="username" // Chrome warning fix for IDs
            className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border" 
          />
        </div>

        {/* 2. Full Name */}
        <div className="w-full">
          <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Full Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            value={formData.name} 
            onChange={handleInputChange} 
            autoComplete="name" // Standard autocomplete value
            className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border" 
          />
        </div>

        {/* 3. Email */}
        <div className="w-full">
          <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Email</label>
          <input 
            type="email" 
            name="username" 
            required 
            value={formData.username} 
            onChange={handleInputChange} 
            autoComplete="email" // Standard autocomplete value
            className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border" 
          />
        </div>

        {/* 4. Role */}
        <div className="w-full">
          <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Role</label>
          <select 
            name="role" 
            required 
            value={formData.role} 
            onChange={handleInputChange} 
            className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border"
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Oprator">Oprator</option>
          </select>
        </div>

        {/* 5. Identity No */}
        <div className="w-full">
          <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Identity No (Aadhar/PAN)</label>
          <input 
            type="text" 
            name="identityNo" 
            required 
            value={formData.identityNo} 
            onChange={handleInputChange} 
            autoComplete="off" // Tells browser not to guess for identity card numbers
            className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border" 
          />
        </div>

        {/* 6. Password with Eye Toggle */}
        <div className="w-full">
          <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Password</label>
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              required 
              value={formData.password}
              onChange={handleInputChange} 
              autoComplete="current-password" // Explicitly fixes the password DOM warning
              className="w-full bg-zinc-950 border border-zinc-800 p-3 pr-12 rounded-xl text-white focus:border-[#E2B747] outline-none transition-all box-border" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs uppercase font-bold z-10"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-[#E2B747] text-black py-3 rounded-xl font-bold uppercase tracking-widest mt-4 hover:bg-white transition-all box-border"
        >
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;