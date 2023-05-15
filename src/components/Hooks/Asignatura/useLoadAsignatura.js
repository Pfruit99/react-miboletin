import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadAsignatura = (id, asignaturaData) => {
    const [asignatura, setAsignatura] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cursos, setCursos] = useState([]);
    useEffect(()=>{
        const useLoadAsignatura = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/asignaturas/${id}`);
                setAsignatura(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadAsignatura();
        } else {
            setAsignatura(null)
        }
    },[id])

    useEffect(()=> {
        const loadCurso = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/cursos`);
                setCursos(result.map(curso => ({
                    label: `${curso.grado}`,
                    value: curso.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        loadCurso()
    }, [])

    return {
        asignatura,
        cursos,
        loading,
    }
}

export default useLoadAsignatura;
