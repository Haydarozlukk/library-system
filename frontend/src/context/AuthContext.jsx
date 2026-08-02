import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('auth');
        if (stored) {
            setAuth(JSON.parse(stored));
        }
    }, []);

    const login = useCallback((authResponse) => {
        localStorage.setItem('auth', JSON.stringify(authResponse));
        setAuth(authResponse);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('auth');
        setAuth(null);
    }, []);

    const isAdmin = auth?.role === 'ADMIN';
    const isCustomer = auth?.role === 'CUSTOMER';

    return (
        <AuthContext.Provider value={{ auth, login, logout, isAdmin, isCustomer, isLoggedIn: !!auth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth, AuthProvider içinde kullanılmalı');
    }
    return ctx;
}
