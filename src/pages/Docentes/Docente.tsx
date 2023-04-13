import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Http } from '../../services/httphandlers';
import { DocenteInterface } from '../../interfaces';
import DataTable from '../../components/DataTable';
import { dataExample } from '../../data';

const http = new Http();
const Docente = () => {
  const columns = [
    {
      Header: "First Name",
      accessor: "firstName"
    },
    {
      Header: "Last Name",
      accessor: "lastName"
    },
    {
      Header: "Age",
      accessor: "age"
    },
    {
      Header: "Visits",
      accessor: "visits"
    },
    {
      Header: "Status",
      accessor: "status"
    },
    {
      Header: "Profile Progress",
      accessor: "progress"
    }
  ];
  const initialState = {
    pageSize: 10,
    pageIndex: 0
  };
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
        <DataTable 
          data={dataExample}
          columns={columns}
          initialState={initialState}
        />
    </>
  )
}

export default Docente