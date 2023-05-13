import React, {useEffect, useState} from 'react';
import {get} from "../../../helpers/api_helper";

const useLoadForm = (casinoId, menuId) => {
    const [foodTypes, setFoodTypes] = useState([]);
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        const loadFoodTypes = async () => {
            try {
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/foodTypes/findByCasino/${casinoId}`)
                setFoodTypes(result.body.map(x => ({
                    label: x.name,
                    value: x.id,
                })))
            } catch (e) {
                console.log('error loading food types: ', e);
            }
        }
        const loadMenus = async () => {
            try {
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/menus/findToWeeklyMenuForm`);
                let aux = result.body;
                setMenus(aux.map(x => ({
                    label: x.name,
                    value: x.menuDetailId,
                })))
            } catch (e) {
                console.log('error loading menus: ', e);
            }
        }
        loadFoodTypes()
        loadMenus()
    }, [casinoId]);
    useEffect(()=>{
        if(menuId){
            const aux = menus
            setMenus(aux.filter(x => x.value !== menuId))
        }
    },[menuId])

    return {
        foodTypes,
        menus
    }
};

export default useLoadForm;
