import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Http } from '../../services/httphandlers';
import { DocenteInterface } from '../../interfaces';

const http = new Http();
const Docente = () => {
  const [docentes, setDocentes] = useState<DocenteInterface[]>([]);
  useEffect(()=>{
    const cargarDocente = async() => {
        const docentesData = await http.get<DocenteInterface[]>("https://localhost:44382/api/Docente/GetDocentes");
        // const docente = await axios.get("https://localhost:44382/api/Docente/GetDocentes");
        setDocentes(docentesData);
        console.log('docente', docentesData)
    }
    cargarDocente();
  },[])
  return (
    <>
        {docentes.map(docente => (
            <h2>correo: {docente.correo}</h2>
        ))}
    </>
  )
}

export default Docente