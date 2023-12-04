import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadAreas = () => {
    const [areas, setAreas] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadAreasApi = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/area`);
                setAreas(result.map(area => ({
                    label: area.nombre,
                    value: area.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        useLoadAreasApi();
    },[])

    return {
        areas,
        loading,
    }
}

export default useLoadAreas;
