import React, {useEffect, useState} from 'react';
import {get, post} from "../../../helpers/api_helper";
import moment from "moment";
import {showToast} from "../../Common/notifications";
import localStorage from "redux-persist/es/storage";

const useConsumption = () => {
    const [consumptions, setConsumptions] = useState([]);
    const [loadConsumptions, setLoadConsumptions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [door, setDoor] = useState('');
    const loadConsumptionsFn = async () => {
        try {
            const initialDate = moment().format('YYYY-MM-DD')
            const finalDate = moment().add(1, 'days').format('YYYY-MM-DD')
            const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/consumptions/findToTablet?initialDate=${initialDate}&finalDate=${finalDate}&door=${door}`)
            setConsumptions(result.body)
        } catch (e) {
            console.log('e: ', e);
        }
    }
    const sendConsumptions = async (door) => {
        try {
            setLoading(true)
            await post(`${import.meta.env.VITE_APP_BACKEND_URL}/consumptions/create`,{
                door,
                "initialDate":moment().format('YYYY-MM-DD'),
                "finalDate":moment().add(1, 'days').format('YYYY-MM-DD'),
                "hour": moment().format('HH:mm:ss'),
                turn: 23,
            })
            showToast({
                title: "Ok",
                message: "Se ha completado la solicitud correctamente"
            })
        } catch (e) {
            console.log('e: ', e);
            showToast({
                toastType: "error",
                title: "Error",
                message: "Ha ocurrido un error"
            })
        } finally {
            setLoading(false)
            await loadConsumptionsFn()
        }
    }
    useEffect(() => {
        const loadDoor = async () => {
            setDoor( await localStorage.getItem("door_consumption") )
        }
        loadDoor()
    }, [])
    useEffect(() => {
        if(door)
            loadConsumptionsFn()
    }, [door]);

    return {
        consumptions,
        loadConsumptions,
        sendConsumptions,
        door,
        loading,
    };
};

export default useConsumption;
