import { useState, useCallback } from "react";
import fetchData from "../Services/APIservice";

export default function useGet(config) {
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
            return resData;
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [config]);

    return {
        error,
        loading,
        send
    };
}
