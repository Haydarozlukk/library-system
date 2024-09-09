import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
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
        if (!newCustomer.name || !newCustomer.email || !newCustomer.password || !newCustomer.address || !newCustomer.phoneNumber) {
            alert("All fields are required!");
            return;
        }

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
            alert("Customer created successfully!");
        } catch (error) {
            console.error("Error creating customer", error);
            alert("There was an error creating the customer.");
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/customer/delete/${id}`);
            fetchCustomers();
            alert("Customer deleted successfully!");
        } catch (error) {
            console.error("Error deleting customer", error);
            alert("There was an error deleting the customer.");
        }
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Customer List
            </Typography>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.phoneNumber}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteCustomer(customer.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" style={{ marginTop: '40px' }}>
                Create New Customer
            </Typography>

            <form noValidate autoComplete="off" style={{ marginTop: '20px' }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={newCustomer.password}
                    onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
                />

                <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                />

                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newCustomer.phoneNumber}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                />

                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    onClick={createCustomer}
                >
                    Create Customer
                </Button>
            </form>
        </div>
    );
}

export default CustomerList;
