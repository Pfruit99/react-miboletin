import { useEffect, useState } from "react";
import { get } from "../../../helpers/api_helper";

const useLoadFoodComponent = (id) => {
    const [foodComponent, setFoodComponent] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const loadFoodComponent = async () => {
            try {
                setLoading(true);
                const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/foodComponents/findById/${id}`);
                setFoodComponent(result.body)
            } catch (error) {
                console.log('error', error)
            }finally{
                setLoading(false);
            }
        }
        if(id){
            loadFoodComponent();
        } else {
            setFoodComponent(null)
        }
    },[id])

    return {
        foodComponent,
        loading,
    }
}

export const useLoadFoodComponentType = () => {
    const [foodComponentTypes, SetFoodComponentTypes] = useState([]);
    const [loadingFoodComponents, setLoadingFoodComponents] = useState(false);
    useEffect(()=>{
        const loadFoodComponents = async () => {
            const result = await get(`${import.meta.env.VITE_APP_BACKEND_URL}/foodComponentTypes`);
            SetFoodComponentTypes([
                ...result.body.map(r => ({
                    value: r.id,
                    label: r.name
                }))
            ]);
        }
        loadFoodComponents()
    },[])
    return {foodComponentTypes, loadingFoodComponents}
}

export default useLoadFoodComponent;
