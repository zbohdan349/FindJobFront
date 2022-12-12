import { useState,useCallback } from "react";
import { useNavigate } from "react-router-dom"

export const useHttp = () => {
    const navigate = useNavigate();

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);

    const request = useCallback( async (url, method ='GET',body=null,headers={'Content-Type':'application/json'}) =>{
        setLoading(true);
        const token = localStorage.getItem('Authorization');
        headers.Authorization = token;
        
        try {
            const response = await fetch(url,{method,body:body,headers});
            if (!response.ok) {
                if (response.status ===401) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('Authorization');
                    navigate('/login');
                }
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            setError(false)
            return data;
        } catch (e) {

            setLoading(false);
            setError(e.message)
            throw e
        }
    }, []);

    const clearError = useCallback( () => {setError(null)}, []);

    return{loading, request, error, clearError}
}