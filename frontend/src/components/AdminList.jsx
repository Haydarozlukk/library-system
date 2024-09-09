import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminList() {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: '', active: true });

    useEffect(() => {
        fetchAdmins();
    }, []);

    // Admin listesini sunucudan getirir
    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/admin/all');
            setAdmins(response.data);
        } catch (error) {
            console.error("Error fetching admins", error);
        }
    };

    // Yeni bir admin oluşturur
    const createAdmin = async () => {
        // Basit validasyon: Tüm alanların dolu olup olmadığını kontrol edin
        if (!newAdmin.name || !newAdmin.email || !newAdmin.password || !newAdmin.role) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/admin/create', newAdmin);
            console.log("Admin created successfully", response.data);
            fetchAdmins();  // Admin eklendikten sonra listeyi yeniler
            alert("Admin created successfully!");
        } catch (error) {
            // Hata durumunda loglama ve kullanıcıya mesaj gösterme
            console.error("Error creating admin", error.response ? error.response.data : error.message);
            alert("There was an error creating the admin. Please check the console for more details.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Admin List</h2>

            <table className="table table-striped table-bordered mt-4">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {admins.map(admin => (
                    <tr key={admin.id}>
                        <td>{admin.id}</td>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.role}</td>
                        <td>{admin.active ? 'Active' : 'Inactive'}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3 className="mt-5">Create Admin</h3>
            <form className="mt-3">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={newAdmin.name}
                        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        className="form-control"
                        id="role"
                        placeholder="Enter role"
                        value={newAdmin.role}
                        onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                    />
                </div>

                <button type="button" className="btn btn-primary mt-3" onClick={createAdmin}>Create Admin</button>
            </form>
        </div>
    );
}

export default AdminList;
