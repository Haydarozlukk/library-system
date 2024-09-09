import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/customer/all');
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers", error);
        }
    };

    const createCustomer = async () => {
        try {
            await axios.post('http://localhost:8081/api/customer/create', newCustomer);
            setNewCustomer({
                name: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: ''
            }); // Formu sıfırla
            fetchCustomers();
        } catch (error) {
            console.error("Error creating customer", error);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/customer/delete/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error("Error deleting customer", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Customer List</h2>

            {/* Müşteri Listesi */}
            <table className="table table-striped table-bordered mt-4">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteCustomer(customer.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Yeni Müşteri Ekleme Formu */}
            <h3 className="mt-5">Create New Customer</h3>
            <form className="mt-3">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={newCustomer.password}
                        onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter address"
                        value={newCustomer.address}
                        onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="Enter phone number"
                        value={newCustomer.phoneNumber}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={createCustomer}>
                    Create Customer
                </button>
            </form>
        </div>
    );
}

export default CustomerList;
