import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '',
        dob: '', address: '', pinCode: '', identityNo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const BASE_URL = import.meta.env.VITE_API_URL;
            
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Registration Successful!");
                setFormData({ name: '', email: '', password: '', phone: '', dob: '', address: '', pinCode: '', identityNo: '' });
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
        <div className="min-h-screen bg-gray-500 flex items-center justify-center p-4">
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Member Registration</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    <input name="phone" placeholder="Mobile Number" onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    <input type="text" placeholder="Date of Birth (dd-mm-yyyy)" name="dob" className="w-full p-2 mb-3 border border-black rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => {
                                if (!e.target.value) e.target.type = "text";
                            }}
                            onChange={handleChange}
                            required
                            />
                    <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    <input name="pinCode" type="number" placeholder="Pin Code" onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    <input name="identityNo" placeholder="Identity No (Aadhar/PAN)" onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    
                    <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;