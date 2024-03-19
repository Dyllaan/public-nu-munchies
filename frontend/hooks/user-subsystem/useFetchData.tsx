import { useState, useEffect } from 'react';
import * as api from './api';
import { toast } from 'sonner';
/**
 * custom hook to check data from the api
 * just makes simple get requests easier
 * Runs in the background
 * just change the endpoint to get new data with parameters if needed
 * @author Louis Figes
 * @generated GitHub Copilot was used in the creation of this code.
 */
const useFetchData = (initialEndpoint:any) => {
    const [endpoint, setEndpoint] = useState(initialEndpoint);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (loading && !sent) {
            setSent(true);
            fetchData();
        }
    }, [endpoint, loading]);

    async function fetchData() {
        try {
            const headers = localStorage.getItem("token") ? localStorage.getItem("token") : {};
            const response = await api.get(endpoint, headers);
            if (response.success) {
                console.log(response.data.data)
                setData(response.data.data);
                setLoading(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error:any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setSent(false);
        }
    }

    return { 
        loading, 
        data, 
        error, 
        reloadData: () => setLoading(true), 
        setEndpoint
    };
};

export default useFetchData;
