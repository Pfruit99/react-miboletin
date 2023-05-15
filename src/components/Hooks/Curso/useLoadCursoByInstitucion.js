import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadCursos = (institucionId) => {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadCursos = async () => {
            try {
                setLoading(true);
                const result = await post(`${import.meta.env.VITE_APP_BACKEND_URL}/cursos/findByWhere`,{
                  ['institucion.id']: institucionId,
                });
                setCursos(result.map(c => ({
                    label: c.grado,
                    value: c.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(institucionId){
            useLoadCursos();
        } else {
            setCursos([])
        }
    },[institucionId])

    return {
        cursos,
        loading,
    }
}

export default useLoadCursos;
