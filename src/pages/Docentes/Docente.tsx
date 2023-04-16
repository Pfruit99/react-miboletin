import React, { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
import '../../assets/styles/docente/docentes_page.scss';
import { Http } from '../../services/httphandlers';
import { DocenteInterface } from '../../interfaces';
import DataTable from '../../components/DataTable';
import InformationModal from './components/InformationModal';
import { DocenteColumns } from './values';
import { config, urlDocente } from '../../config';

const http = new Http();
const Docente = () => {
  const [docentes, setDocentes] = useState<DocenteInterface[]>([]);
  const [subTitleDocente, setSubTitleDocente] = useState('');
  const [isNewDocente, setIsNewDocente] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [idDocente, setIdDocente] = useState<null | number>(null);
  const columns = DocenteColumns(setIsOpen, setSubTitleDocente, setIsNewDocente,setIdDocente);
  const initialState = {
    pageSize: 10,
    pageIndex: 0
  };
  const cargarDocentes = useCallback(async () => {
    const docentesData = await http.get<DocenteInterface[]>(urlDocente.getDocente);
    setDocentes(docentesData);
  },[])
  useEffect(()=>{
    cargarDocentes();
  },[cargarDocentes])
  return (
    <>
      <div className='container'>
          <button onClick={()=>{
            setSubTitleDocente("Crear nuevo Docente");
            setIsOpen(true)
            setIsNewDocente(true)
          }}>Crear Nuevo Docente</button>
          <DataTable
            data={docentes}
            columns={columns}
            initialState={initialState}
          />
      </div>
      <InformationModal
        isOpen={isOpen}
        closeModal={()=>setIsOpen(false)}
        subtitleText={subTitleDocente}
        loadData={cargarDocentes}
        isNew={isNewDocente}
        id={idDocente}
      />
    </>
  )
}

export default Docente
