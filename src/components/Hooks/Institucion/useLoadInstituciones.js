import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadInstituciones = () => {
    const [instituciones, setInstituciones] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadInstituciones = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/instituciones`);
                setInstituciones(result.map(institucion => ({
                    label: `${institucion.nombre} - ${institucion.nit}`,
                    value: institucion.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        useLoadInstituciones()
    },[])

    return {
        instituciones,
        loading,
    }
}

export default useLoadInstituciones;
