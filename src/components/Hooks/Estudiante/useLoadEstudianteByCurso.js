import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadEstudianteByCurso = (cursoId) => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadEstudiantes = async () => {
            try {
                setLoading(true);
                const result = await post(`${import.meta.env.VITE_APP_BACKEND_URL}/estudiantes/findByWhere`,{
                    relations: ['curso'],
                    where: {
                        curso: {
                            id: cursoId
                        }
                    },
                });
                setEstudiantes(result.map(e => ({
                    label: `${e.usuario.nombre} ${e.usuario.apellido} - ${e.codEstudiante}`,
                    value: e.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(cursoId){
            useLoadEstudiantes();
        } else {
            setEstudiantes([])
        }
    },[cursoId])

    return {
        estudiantes,
        loading,
    }
}

export default useLoadEstudianteByCurso;
