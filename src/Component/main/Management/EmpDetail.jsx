import React, { useState, useEffect } from 'react';

const EmpDetail = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModalPassword, setShowModalPassword] = useState(false); // Modal ke password toggle ke liye
    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchEmployees();
    }, []);

    // 1. Fetch All Employees
    const fetchEmployees = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/emp/all`);
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    // 2. Open Edit Modal
    const handleEdit = (emp) => {
        setSelectedEmp({ ...emp }); 
        setShowModalPassword(false); // Modal khulte hi standard pattern setup
        setIsModalOpen(true);
    };

    // 3. Update Employee
    const handleUpdate = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/emp/update/${selectedEmp.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedEmp)
            });

            if (response.ok) {
                alert("Employee Updated Successfully!");
                setIsModalOpen(false);
                fetchEmployees();
            } else {
                alert("Update failed on server.");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Update failed!");
        }
    };

    // 4. Delete Employee
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                const response = await fetch(`${BASE_URL}/api/emp/delete/${id}`, { 
                    method: 'DELETE' 
                });
                if (response.ok) {
                    alert("Employee Deleted Successfully!");
                    fetchEmployees();
                } else {
                    alert("Delete failed on server.");
                }
            } catch (err) {
                console.error("Delete Error:", err);
            }
        }
    };

    return (
        <div className="p-3 sm:p-6 text-black bg-gray-300 min-h-screen box-border">
            <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wider text-gray-800">Employee Details (Admin Panel)</h2>
            
            {/* 1. MOBILE VIEW: Fluid Stacked Card Layout (Hidden on desktop, Block on Mobile) */}
            <div className="block sm:hidden space-y-4">
                {employees.length === 0 ? (
                    <div className="bg-white p-4 rounded-xl text-center text-gray-500">No employees available.</div>
                ) : (
                    employees.map((emp) => (
                        <div key={emp.id} className="bg-white p-4 rounded-xl shadow border border-gray-200 space-y-2">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase">ID: {emp.empId}</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${emp.status === 'Inactive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                    {emp.status || 'Active'}
                                </span>
                            </div>
                            <div className="text-sm space-y-1">
                                <p className="font-bold text-base text-gray-900">{emp.name}</p>
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">Email:</span> {emp.username}</p>
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">Role:</span> <span className="bg-blue-100 text-blue-800 text-[11px] px-2 py-0.5 rounded font-medium">{emp.role}</span></p>
                                <p className="text-gray-600"><span className="font-semibold text-gray-500">Identity No:</span> {emp.identityNo}</p>
                                
                                <div className="mt-2 bg-gray-100 p-2 rounded-lg flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-500">Password:</span>
                                    <span className="font-mono text-xs font-bold text-gray-800">{emp.password}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2 border-t mt-3">
                                <button onClick={() => handleEdit(emp)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-xl font-medium transition text-sm">Edit</button>
                                <button onClick={() => handleDelete(emp.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-xl font-medium transition text-sm">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 2. DESKTOP VIEW: Clean Structured Table (Hidden on Mobile) */}
            <div className="hidden sm:block overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-lg">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-gray-800 text-white border-b">
                        <tr>
                            <th className="p-3 text-left">Emp ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email (Username)</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Identity No.</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Password</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="p-4 text-center text-gray-500 bg-gray-50">No employees found.</td>
                            </tr>
                        ) : (
                            employees.map((emp) => (
                                <tr key={emp.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3 font-semibold text-gray-700">{emp.empId}</td>
                                    <td className="p-3 font-medium text-gray-900">{emp.name}</td>
                                    <td className="p-3 text-gray-600">{emp.username}</td>
                                    <td className="p-3">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                                            {emp.role}
                                        </span>
                                    </td>
                                    <td className="p-3 text-gray-600">{emp.identityNo}</td>
                                    <td className="p-3">
                                        <span className={`text-xs px-2 py-1 rounded font-bold ${emp.status === 'Inactive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {emp.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="p-3 font-mono text-sm text-gray-800 bg-gray-50/50 select-all">{emp.password}</td>
                                    <td className="p-3 text-center whitespace-nowrap">
                                        <button onClick={() => handleEdit(emp)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg transition mr-2 text-sm">Edit</button>
                                        <button onClick={() => handleDelete(emp.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition text-sm">Del</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 3. RESPONSIVE EDIT MODAL */}
            {isModalOpen && selectedEmp && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto box-border">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Edit Employee Details</h2>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Emp ID</label>
                                <input className="w-full p-2.5 border rounded-xl bg-gray-100 outline-none" value={selectedEmp.empId || ''} onChange={e => setSelectedEmp({...selectedEmp, empId: e.target.value})} />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                                <input className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none" value={selectedEmp.name || ''} onChange={e => setSelectedEmp({...selectedEmp, name: e.target.value})} />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email (Username)</label>
                                <input className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none" value={selectedEmp.username || ''} onChange={e => setSelectedEmp({...selectedEmp, username: e.target.value})} />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role</label>
                                <select className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none bg-white" value={selectedEmp.role || ''} onChange={e => setSelectedEmp({...selectedEmp, role: e.target.value})}>
                                    <option value="Manager">Manager</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Oprator">Oprator</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                                <select className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none bg-white" value={selectedEmp.status || 'Active'} onChange={e => setSelectedEmp({...selectedEmp, status: e.target.value})}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Identity No</label>
                                <input className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none" value={selectedEmp.identityNo || ''} onChange={e => setSelectedEmp({...selectedEmp, identityNo: e.target.value})} />
                            </div>

                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                                <input 
                                    type={showModalPassword ? "text" : "password"} 
                                    className="w-full p-2.5 border rounded-xl focus:border-blue-500 outline-none pr-12 font-mono" 
                                    value={selectedEmp.password || ''} 
                                    onChange={e => setSelectedEmp({...selectedEmp, password: e.target.value})} 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowModalPassword(!showModalPassword)}
                                    className="absolute right-3 bottom-3 text-xs uppercase font-bold text-blue-600 hover:text-blue-800"
                                >
                                    {showModalPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 py-2.5 rounded-xl font-semibold transition">Cancel</button>
                            <button onClick={handleUpdate} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmpDetail;