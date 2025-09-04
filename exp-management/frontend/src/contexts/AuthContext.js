import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login/', {
                username,
                password
            });
            
            if (response.access) {
                const userData = {
                    username,
                    access: response.access,
                    refresh: response.refresh,
                    role: 'admin' // Default role, could be extracted from JWT
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);
                return { success: true };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Đăng nhập thất bại' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) return false;

            const response = await api.post('/auth/refresh/', {
                refresh: refreshToken
            });

            if (response.access) {
                const currentUser = { ...user, access: response.access };
                setUser(currentUser);
                localStorage.setItem('user', JSON.stringify(currentUser));
                localStorage.setItem('access_token', response.access);
                return true;
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
