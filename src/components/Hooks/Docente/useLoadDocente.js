import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadDocente = (id, docenteData) => {
    const [docente, setDocente] = useState(null);
    const [userAvailable, setUserAvailable] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadDocente = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/docentes/${id}`);
                setDocente(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadDocente();
        } else {
            setDocente(null)
        }
    },[id])

    useEffect(()=> {
        const loadUserAvailable = async () => {
            try {
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/common/findUserAvailable/docente`);
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
        docente,
        userAvailable,
        loading,
    }
}

export default useLoadDocente;
