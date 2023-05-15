import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadCurso = (id, cursoData) => {
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(false);
    const [estudiantes, setEstudiantes] = useState([]);
    useEffect(()=>{
        const useLoadCurso = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/cursos/${id}`);
                setCurso(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadCurso();
        } else {
            setCurso(null)
        }
    },[id])

    useEffect(()=> {
        const loadEstudiantes = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/estudiantes`);
                console.log('result', result);
                setEstudiantes(result.map(estudiante => ({
                    label: `${estudiante.usuario.nombre} ${estudiante.usuario.apellido} - ${estudiante.usuario.identificacion}`,
                    value: estudiante.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        loadEstudiantes()
    }, [])

    return {
        curso,
        estudiantes,
        loading,
    }
}

export default useLoadCurso;
