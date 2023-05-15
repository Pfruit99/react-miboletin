import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadNota = (id, notaData) => {
    const [nota, setNota] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadNota = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/notas/${id}`);
                setNota(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadNota();
        } else {
            setNota(null)
        }
    },[id])

    return {
        nota,
        loading,
    }
}

export default useLoadNota;
