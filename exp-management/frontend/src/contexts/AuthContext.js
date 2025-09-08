import React, { createContext, useState, useContext } from 'react';
import api from '../utils/services/api';

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
                    role: response.role || 'user',
                    name: response.name || username,
                    email: response.email || `${username}@company.com`
                };
                
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);
                
                setLoading(false);
                return { success: true };
            }
            
            setLoading(false);
            return { success: false, error: 'Invalid credentials' };
            
        } catch (error) {
            setLoading(false);
            return { success: false, error: error.message || 'Login failed' };
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
            // Silent error handling - log to monitoring service in production
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
