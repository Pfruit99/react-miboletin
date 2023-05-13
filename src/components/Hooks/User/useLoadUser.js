import { useEffect, useState } from "react";
import {get, post} from "../../../helpers/api_helper";

const useLoadUser = (id, userData) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const useLoadUser = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/findById/${id}`);
                setUser(result)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        const loadRol = async () => {
            try {
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/findRoles`);
                setRoles(Object.entries(result).map( ([value]) => ({
                    label: value,
                    value: value,
                })))
            } catch (e) {
                setRoles([])
            }
        }
        if(id){
            useLoadUser();
        } else {
            setUser(null)
        }
        loadRol()
    },[id])


    return {
        user,
        roles,
        loading,
    }
}

export default useLoadUser;
