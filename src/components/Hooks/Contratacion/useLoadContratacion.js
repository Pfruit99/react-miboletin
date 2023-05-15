import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadContratacion = (id, contratacionData) => {
    const [contratacion, setContratacion] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadContratacion = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/contratacion/${id}`);
                setContratacion(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadContratacion();
        } else {
            setContratacion(null)
        }
    },[id])


    return {
        contratacion,
        loading,
    }
}

export default useLoadContratacion;
