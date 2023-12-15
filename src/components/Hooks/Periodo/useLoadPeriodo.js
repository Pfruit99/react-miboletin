import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadPeriodo = (id, periodoData) => {
    const [periodo, setPeriodo] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadPeriodo = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/periodo/${id}`);
                setPeriodo(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadPeriodo();
        } else {
            setPeriodo(null)
        }
    },[id])


    return {
        periodo,
        loading,
    }
}

export default useLoadPeriodo;
