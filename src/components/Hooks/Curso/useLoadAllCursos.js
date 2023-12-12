import { useEffect, useState } from "react";
import {get} from "../../../helpers/api_helper";

const useLoadCursos = () => {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadCursosApi = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/cursos/findComplete`);
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
        useLoadCursosApi();
    },[])

    return {
        cursos,
        loading,
    }
}

export default useLoadCursos;
