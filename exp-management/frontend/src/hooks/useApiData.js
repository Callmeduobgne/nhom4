import { useState, useEffect } from 'react';
import api from '../services/api';

function useApiData(endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get(endpoint);
            setData(response || []);
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            setData([]); // Set empty array on error to prevent crashes
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
        addRecord,
        updateRecord,
        deleteRecord,
        refetch: fetchData
    };
}

export default useApiData;
