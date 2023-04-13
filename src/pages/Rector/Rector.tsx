import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Http } from '../../services/httphandlers';
import { Rectoresinterface } from '../../interfaces';

const http = new Http();
const Rector = () => {
  const [rectores, setRectores] = useState<Rectoresinterface[]>([]);
  useEffect(()=>{
    const cargarRector = async() => {
        const rectoresData = await http.get<Rectoresinterface[]>("https://localhost:44382/api/Rector/GetRectores");
        // const docente = await axios.get("https://localhost:44382/api/Docente/GetDocentes");
        setRectores(rectoresData);
        console.log('rector', rectoresData)
    }
    cargarRector();
  },[])
  return (
    <>
        {rectores.map(rector => (
            
            <h2> correo: {rector.correo}</h2>
        ))}
    </>
  )
}

export default Rector