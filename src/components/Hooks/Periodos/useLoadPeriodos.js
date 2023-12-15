import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadPeriodos = () => {
    const [periodos, setPeriodos] = useState(null);
    const [periodosComplete, setPeriodosComplete] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadPeriodosApi = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/periodo`);
                setPeriodos(result.map(periodo => ({
                    label: periodo.nombre,
                    value: periodo.id,
                })))
                setPeriodosComplete(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        useLoadPeriodosApi();
    },[])

    return {
        periodos,
        periodosComplete,
        loading,
    }
}

export default useLoadPeriodos;
