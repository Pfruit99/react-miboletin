import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadBoletines = () => {
    const [boletines, setBoletines] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadBoletines = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/boletines`);
                setBoletines(result.map(boletin => ({
                  label: `${boletin.usuario.nombre} ${boletin.usuario.apellido} - ${boletin.usuario.identificacion}`,
                  value: boletin.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        useLoadBoletines()
    },[])

    return {
        boletines,
        loading,
    }
}

export default useLoadBoletines;
