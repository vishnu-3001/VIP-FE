import { useState, useCallback } from "react";
import fetchData from "../Services/APIservice";

export default function useGet(initialData, config) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const send = useCallback(async (endpoint,payload) => {
        setLoading(true);
        setError('');
        try {
            const resData = await fetchData(endpoint, {
                ...config,
                body: payload
            });
            setData(resData);
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [config]);

    return {
        data,
        error,
        loading,
        send
    };
}
