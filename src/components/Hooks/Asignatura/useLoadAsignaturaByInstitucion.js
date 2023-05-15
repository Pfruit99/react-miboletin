import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadAsignaturas = (institucionId) => {
    const [asignaturas, setAsignaturas] = useState([]);
    const [porcentajesNota, setPorcentajesNota] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadAsignaturas = async () => {
            try {
                setLoading(true);
                const result = await post(`${import.meta.env.VITE_APP_BACKEND_URL}/asignaturas/findByWhere`,{
                  ['institucion.id']: institucionId,
                });
                setAsignaturas(result.map(a => ({
                  label: a.nombre,
                  value: a.id
                })))
                setPorcentajesNota(result.map(a => ({
                    id: a.id,
                    porcentajeAsistencia: a.porcentajeAsistencia,
                    porcentajeClase: a.porcentajeClase,
                    porcentajeParcial: a.porcentajeParcial,
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(institucionId){
            useLoadAsignaturas();
        } else {
            setAsignaturas([])
            setPorcentajesNota([])
        }
    },[institucionId])

    return {
        asignaturas,
        porcentajesNota,
        loading,
    }
}

export default useLoadAsignaturas;