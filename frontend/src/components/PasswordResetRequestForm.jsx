import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetRequestForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8081/api/customer/password-reset/request', { email })
            .then(response => {
                setMessage('Parola sıfırlama bağlantısı e-posta adresinize gönderildi.');
            })
            .catch(error => {
                setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
            });
    };

    return (
        <div>
            <h2>Parola Sıfırlama Talebi</h2>
            <form onSubmit={handleSubmit}>
                <label>E-posta adresi:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Parola Sıfırlama Bağlantısı Gönder</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PasswordResetRequestForm;
