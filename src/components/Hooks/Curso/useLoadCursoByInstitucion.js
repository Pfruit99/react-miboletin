import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadCursos = (institucionId, docenteId=0, roles=[]) => {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadCursos = async () => {
            try {
                setLoading(true);
                const where = {
                    institucion: {
                        id: institucionId
                    },
                }
                if(docenteId && !roles.includes('administrador')){
                    where.asignaturas = {
                        docente: {
                            id: docenteId
                        }
                    };
                }
                const result = await post(`${import.meta.env.VITE_APP_BACKEND_URL}/cursos/findByWhere`,{...where});
                setCursos(result.map(c => ({
                    label: `${c.nombre}`,
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
    },[institucionId ])

    return {
        cursos,
        loading,
    }
}

export default useLoadCursos;
