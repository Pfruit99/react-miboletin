import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadDocentes = () => {
    const [docentes, setDocentes] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadDocentes = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/docentes`);
                setDocentes(result.map(docente => ({
                    label: `${docente.usuario.nombre} ${docente.usuario.apellido} - ${docente.usuario.identificacion}`,
                    value: docente.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        useLoadDocentes()
    },[])

    return {
        docentes,
        loading,
    }
}

export default useLoadDocentes;
