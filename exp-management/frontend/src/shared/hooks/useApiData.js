import { useState, useEffect, useCallback } from 'react';
import api from '../../utils/services/api';

// Mock data for demo purposes
const mockData = {
    '/employees': [
        { id: '1', name: 'Nguyễn Văn An', email: 'an.nguyen@company.com', position: 'Senior Developer', department: 'IT' },
        { id: '2', name: 'Trần Thị Bình', email: 'binh.tran@company.com', position: 'HR Manager', department: 'HR' },
        { id: '3', name: 'Lê Văn Cường', email: 'cuong.le@company.com', position: 'Project Manager', department: 'IT' },
        { id: '4', name: 'Phạm Thị Dung', email: 'dung.pham@company.com', position: 'Accountant', department: 'Finance' },
        { id: '5', name: 'Hoàng Văn Em', email: 'em.hoang@company.com', position: 'Marketing Lead', department: 'Marketing' }
    ],
    '/projects': [
        { id: '1', name: 'Website Redesign', client: 'ABC Corp', status: 'active', progress: 75 },
        { id: '2', name: 'Mobile App', client: 'XYZ Ltd', status: 'planning', progress: 25 },
        { id: '3', name: 'Data Analytics', client: 'DEF Inc', status: 'completed', progress: 100 }
    ],
    '/customers': [
        { id: '1', name: 'ABC Corporation', email: 'contact@abc.com', company: 'ABC Corp', status: 'customer' },
        { id: '2', name: 'XYZ Limited', email: 'info@xyz.com', company: 'XYZ Ltd', status: 'prospect' },
        { id: '3', name: 'DEF Industries', email: 'sales@def.com', company: 'DEF Inc', status: 'lead' }
    ],
    '/transactions': [
        { id: '1', description: 'Website Development', amount: 50000000, type: 'income', category: 'Service' },
        { id: '2', description: 'Office Rent', amount: 15000000, type: 'expense', category: 'Operational' },
        { id: '3', description: 'Software License', amount: 5000000, type: 'expense', category: 'Technology' }
    ],
    '/assets': [
        { id: '1', name: 'MacBook Pro', category: 'equipment', value: 50000000, status: 'active' },
        { id: '2', name: 'Office Desk', category: 'furniture', value: 3000000, status: 'active' },
        { id: '3', name: 'Company Car', category: 'vehicle', value: 800000000, status: 'active' }
    ]
};

/**
 * Custom hook for fetching API data with fallback to mock data
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Object} - { data, loading, error, refetch }
 */
const useApiData = (endpoint, options = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Try to fetch from API first
            try {
                const response = await api.get(endpoint, options);
                setData(response);
            } catch (apiError) {
                // Fallback to mock data if API fails
                console.warn(`API call failed for ${endpoint}, using mock data:`, apiError.message);
                
                // Clean endpoint for mock data lookup
                const cleanEndpoint = endpoint.replace('/api', '').split('?')[0];
                const fallbackData = mockData[cleanEndpoint] || [];
                setData(fallbackData);
            }
        } catch (err) {
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [endpoint, options]);

    useEffect(() => {
        if (endpoint) {
            fetchData();
        }
    }, [endpoint, fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};

export default useApiData;
