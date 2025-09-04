import { useState, useEffect } from 'react';
import api from '../services/api';

function useApiData(endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null
    });

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}page=${page}`;
            const response = await api.get(url);
            
            // Handle paginated response
            if (response && response.results) {
                setData(response.results);
                setPagination({
                    count: response.count || 0,
                    next: response.next,
                    previous: response.previous
                });
            } else {
                // Fallback for non-paginated response
                setData(response || []);
                setPagination({ count: (response || []).length, next: null, previous: null });
            }
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            setData([]);
            setPagination({ count: 0, next: null, previous: null });
        } finally {
            setLoading(false);
        }
    };

    const addRecord = async (values) => {
        try {
            await api.post(endpoint, values);
            fetchData();
        } catch (error) {
            console.error(`Error adding record to ${endpoint}:`, error);
            throw error; // Re-throw to let component handle UI feedback
        }
    };

    const updateRecord = async (id, values) => {
        try {
            await api.put(`${endpoint}${id}/`, values);
            fetchData();
        } catch (error) {
            console.error(`Error updating record in ${endpoint}:`, error);
            throw error;
        }
    };

    const deleteRecord = async (id) => {
        try {
            await api.delete(`${endpoint}${id}/`);
            fetchData();
        } catch (error) {
            console.error(`Error deleting record from ${endpoint}:`, error);
            throw error;
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return {
        data,
        loading,
        pagination,
        addRecord,
        updateRecord,
        deleteRecord,
        refetch: fetchData,
        fetchPage: fetchData
    };
}

export default useApiData;
