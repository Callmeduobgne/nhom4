import { renderHook, act, waitFor } from '@testing-library/react';
import useApiData from '../useApiData';
import api from '../../services/api';

// Mock the API service
jest.mock('../../services/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

describe('useApiData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with empty data and loading false', () => {
        api.get.mockResolvedValue([]);
        
        const { result } = renderHook(() => useApiData('/test/'));
        
        expect(result.current.data).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.pagination).toEqual({
            count: 0,
            next: null,
            previous: null
        });
    });

    it('should fetch data on mount', async () => {
        const mockData = [
            { id: '1', name: 'Test Item 1' },
            { id: '2', name: 'Test Item 2' }
        ];
        api.get.mockResolvedValue(mockData);

        const { result } = renderHook(() => useApiData('/test/'));

        await waitFor(() => {
            expect(result.current.data).toEqual(mockData);
        });
        
        expect(api.get).toHaveBeenCalledWith('/test/?page=1');
        expect(result.current.loading).toBe(false);
    });

    it('should handle paginated response', async () => {
        const mockResponse = {
            count: 25,
            next: 'http://api/test/?page=2',
            previous: null,
            results: [
                { id: '1', name: 'Item 1' },
                { id: '2', name: 'Item 2' }
            ]
        };
        api.get.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useApiData('/test/'));

        await waitFor(() => {
            expect(result.current.data).toEqual(mockResponse.results);
            expect(result.current.pagination).toEqual({
                count: 25,
                next: 'http://api/test/?page=2',
                previous: null
            });
        });
    });

    it('should handle API errors gracefully', async () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        api.get.mockRejectedValue(new Error('API Error'));

        const { result } = renderHook(() => useApiData('/test/'));

        await waitFor(() => {
            expect(result.current.data).toEqual([]);
            expect(result.current.loading).toBe(false);
        });

        expect(consoleError).toHaveBeenCalledWith('Error fetching /test/:', expect.any(Error));
        consoleError.mockRestore();
    });

    it('should add record successfully', async () => {
        api.get.mockResolvedValue([]);
        api.post.mockResolvedValue({ id: '3', name: 'New Item' });

        const { result } = renderHook(() => useApiData('/test/'));

        await act(async () => {
            await result.current.addRecord({ name: 'New Item' });
        });

        expect(api.post).toHaveBeenCalledWith('/test/', { name: 'New Item' });
        expect(api.get).toHaveBeenCalledTimes(2); // Initial fetch + refetch after add
    });

    it('should update record successfully', async () => {
        api.get.mockResolvedValue([]);
        api.put.mockResolvedValue({ id: '1', name: 'Updated Item' });

        const { result } = renderHook(() => useApiData('/test/'));

        await act(async () => {
            await result.current.updateRecord('1', { name: 'Updated Item' });
        });

        expect(api.put).toHaveBeenCalledWith('/test/1/', { name: 'Updated Item' });
        expect(api.get).toHaveBeenCalledTimes(2); // Initial fetch + refetch after update
    });

    it('should delete record successfully', async () => {
        api.get.mockResolvedValue([]);
        api.delete.mockResolvedValue(null);

        const { result } = renderHook(() => useApiData('/test/'));

        await act(async () => {
            await result.current.deleteRecord('1');
        });

        expect(api.delete).toHaveBeenCalledWith('/test/1/');
        expect(api.get).toHaveBeenCalledTimes(2); // Initial fetch + refetch after delete
    });

    it('should fetch specific page', async () => {
        const mockResponse = {
            count: 50,
            next: null,
            previous: 'http://api/test/?page=1',
            results: [{ id: '21', name: 'Item 21' }]
        };
        api.get.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useApiData('/test/'));

        await act(async () => {
            await result.current.fetchPage(2);
        });

        expect(api.get).toHaveBeenCalledWith('/test/?page=2');
        expect(result.current.data).toEqual(mockResponse.results);
    });
});
