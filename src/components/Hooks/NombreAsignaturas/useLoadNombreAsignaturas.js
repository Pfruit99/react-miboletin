import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadNombreAsignaturas = () => {
    const [nombreAsignaturas, setNombreAsignaturas] = useState([]);
    const [allNames, setAllNames] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadNombreAsignaturasApi = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/nombre-asignatura`);
                setAllNames(result.map(nombre => ({
                    label: nombre.nombre,
                    value: nombre.id,
                    areaId: nombre.area.id,
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        useLoadNombreAsignaturasApi();
    },[])

    return {
        nombreAsignaturas,
        setNombreAsignaturas,
        allNames,
        loading,
    }
}

export default useLoadNombreAsignaturas;
