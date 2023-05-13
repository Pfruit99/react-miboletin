import React, {useEffect} from 'react';
import FormConsumption from "../../components/ConsumptionOut/FormConsumption";
import {withTranslation} from "react-i18next";
import useConsumption from "../../components/Hooks/ConsumptionOut/useConsumption";
import Swal from 'sweetalert2';
const ConsumptionEmployee = ({ t }) => {
    const {sendConsumptions, door, loading, consumptions} = useConsumption();
    useEffect(()=>{
        const tokenFromBrowser = localStorage.getItem('secure_token');
        if(tokenFromBrowser !== import.meta.env.VITE_APP_SECURE_TOKEN) {
            Swal.fire({
                icon: 'error',
                title: 'Token no encontrado'
            }).then(()=>{
                window.location.href = "/login"
            })
        }
    },[])
    return (
        <FormConsumption
            t={t}
            sendConsumptions={sendConsumptions}
            loading={loading}
            door={door}
            consumptions={consumptions}
        />
    );
};

export default  withTranslation()(ConsumptionEmployee);
