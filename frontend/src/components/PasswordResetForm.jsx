import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const PasswordResetForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // URL'deki token'ı almak için useSearchParams kullanıyoruz
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Parolalar eşleşmiyor.');
            return;
        }

        axios.post('http://localhost:8081/api/customer/password-reset', { token, password })
            .then(response => {
                setMessage('Parolanız başarıyla güncellendi.');
            })
            .catch(error => {
                setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
            });
    };

    return (
        <div>
            <h2>Yeni Parola Belirleme</h2>
            <form onSubmit={handleSubmit}>
                <label>Yeni Parola:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Parolayı Doğrula:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Parolayı Güncelle</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PasswordResetForm;
