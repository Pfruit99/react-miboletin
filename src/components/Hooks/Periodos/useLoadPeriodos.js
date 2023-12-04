import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadPeriodos = () => {
    const [periodos, setPeriodos] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadPeriodosApi = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/periodo`);
                setPeriodos(result.map(periodo => ({
                    label: periodo.nombre,
                    value: periodo.id
                })))
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
        loading,
    }
}

export default useLoadPeriodos;
