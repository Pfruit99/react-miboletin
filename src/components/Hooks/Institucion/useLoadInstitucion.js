import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadInstitucion = (id, institucionData) => {
    const [institucion, setInstitucion] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadInstitucion = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/instituciones/${id}`);
                setInstitucion(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadInstitucion();
        } else {
            setInstitucion(null)
        }
    },[id])


    return {
        institucion,
        loading,
    }
}

export default useLoadInstitucion;
