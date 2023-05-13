import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadRector = (id, rectorData) => {
    const [rector, setRector] = useState(null);
    const [userAvailable, setUserAvailable] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadRector = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/rectores/${id}`);
                setRector(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            useLoadRector();
        } else {
            setRector(null)
        }
    },[id])

    useEffect(()=> {
        const loadUserAvailable = async () => {
            try {
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/common/findUserAvailable/rector`);
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
        rector,
        userAvailable,
        loading,
    }
}

export default useLoadRector;
