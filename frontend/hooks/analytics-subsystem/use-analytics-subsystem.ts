import { useState, useEffect } from 'react';

const useDataFetching = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const json = await response.json();
                setData(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            // Any cleanup needed
        };
    }, [url]);

    return { data, isLoading, error };
};

export default useDataFetching;
