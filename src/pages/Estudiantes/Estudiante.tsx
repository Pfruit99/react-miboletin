import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Http } from '../../services/httphandlers';
import { EstudiantesInterface } from '../../interfaces';

const http = new Http();
const Estudiante = () => {
  const [Estudiantes, setEstudiantes] = useState<EstudiantesInterface[]>([]);
  useEffect(()=>{
    const cargarEstudiante = async() => {
        const estudiantesData = await http.get<EstudiantesInterface[]>("https://localhost:44382/api/Docente/GetDocentes");
        // const docente = await axios.get("https://localhost:44382/api/Docente/GetDocentes");
        setEstudiantes(estudiantesData);
        console.log('rector', estudiantesData)
    }
    cargarEstudiante();
  },[])
  return (
    <>
        {Estudiantes.map(Estudiantes => (
            <h2>correo: {Estudiantes.correo}</h2>
        ))}
    </>
  )
}

export default Estudiante