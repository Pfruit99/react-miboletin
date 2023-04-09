import React from "react";
// import axios from "axios"

// import modal from "@mui/material"
// import button from "@mui/material/Button"

// import {Edit, Delete } from "@mui/icons-material";

import MUIDataTable from "mui-datatables"


    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [datos, setDatos] = useState<any[]>([]);

    // useEffect(()=>{
    // const FecthDatos =async () => {
    //     const res = await fetch('https://rickandmortyapi.com/api/character/2')
    //     const data = await res.json()
    //     console.log(data)
    //     setDatos(data)
    // }   
    // FecthDatos()
    // },[])


    const columns = ["Nombre", "Docente", "HorasDeAsignatura", "Periodo","Area"];

const data = [
 ["Ingles","1","12:00",1,"lenguas"],
  ["matematicas","1","2:00",1,"lenguas"],

];





function Asignatura() {
    return (
        <MUIDataTable
  title={"Asignaturas"}
  data={data}
  columns={columns}
  
/>
    );
};

export default Asignatura