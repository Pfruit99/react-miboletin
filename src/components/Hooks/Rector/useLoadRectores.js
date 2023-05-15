import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadRectores = () => {
    const [rectores, setRectores] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadRectores = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/rectores`);
                setRectores(result.map(rector => ({
                  label: `${rector.usuario.nombre} ${rector.usuario.apellido} - ${rector.usuario.identificacion}`,
                  value: rector.id
                })))
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        useLoadRectores()
    },[])

    return {
        rectores,
        loading,
    }
}

export default useLoadRectores;
