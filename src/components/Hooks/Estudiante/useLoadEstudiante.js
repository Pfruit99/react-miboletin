import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadEstudiante = (id, estudianteData) => {
    const [estudiante, setEstudiante] = useState(null);
    const [userAvailable, setUserAvailable] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadEstudiante = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/estudiantes/${id}`);
                setEstudiante(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadEstudiante();
        } else {
            setEstudiante(null)
        }
    },[id])

    useEffect(()=> {
        const loadUserAvailable = async () => {
            try {
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/common/findUserAvailable/estudiante`);
                setUserAvailable(result.map(user => ({
                    label: `${user.nombre} ${user.apellido} - ${user.identificacion}`,
                    value: user.id
                })))
            } catch (error) {
                console.log('error', error)
            } finally {

            }
        }
        loadUserAvailable();
    },[])


    return {
        estudiante,
        userAvailable,
        loading,
    }
}

export default useLoadEstudiante;
