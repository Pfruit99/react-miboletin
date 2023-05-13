import {useEffect,useState} from 'react'
import { post } from '../../../helpers/api_helper'


const useLoadActiveCasino = () => {
  const [casinos, setCasinos] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const loadCasinos = async () => {
      try {
        setLoading(true);
        const result = await post(`${import.meta.env.VITE_APP_BACKEND_URL}/casinos/findByWhere`,{
          status: true
        })
        const aux = result.body.map((casino) => ({
          label: casino.name,
          value: casino.id
        }))
        setCasinos(aux)
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false)
      }
    }
    loadCasinos();
  },[])
  return {
    casinos, loading
  }
}
export default useLoadActiveCasino
