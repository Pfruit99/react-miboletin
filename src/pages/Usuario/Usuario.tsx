/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
import '../../assets/styles/docente/docentes_page.scss';
import { Http } from '../../services/httphandlers';
import { UsuariosInterface } from '../../interfaces';
import DataTable from '../../components/DataTable';
import InformationModal from './components/InformationModal';
import { UsuariosColumns } from './values';
import { config, urlUsuarios } from '../../config';

const http = new Http();
const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuariosInterface[]>([]);
  const [subTitleUsuarios, setSubTitleUsuarios] = useState('');
  const [isNewUsuarios, setIsNewUsuarios] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [idUsuarios, setIdUsuarios] = useState<null | number>(null);
  const columns = UsuariosColumns(setIsOpen, setSubTitleUsuarios, setIsNewUsuarios,setIdUsuarios);
  const initialState = {
    pageSize: 10,
    pageIndex: 0
  };
  const cargarUsuarioss = useCallback(async () => {
    const UsuariosData = await http.get<UsuariosInterface[]>(`${"https://localhost:44382/api/Usuarios/GetUsuarios"}`);
    setUsuarios(UsuariosData);
  },[])
  useEffect(()=>{
    cargarUsuarioss();
  },[cargarUsuarioss])
  return (
    <>
      <div className='container'>
          <button onClick={()=>{
            setSubTitleUsuarios("Crear nuevo Usuarios");
            setIsOpen(true)
            setIsNewUsuarios(true)
          }}>Crear Nuevo Usuarios</button>
          <DataTable
            data={usuarios}
            columns={columns}
            initialState={initialState}
          />
      </div>
      <InformationModal
        isOpen={isOpen}
        closeModal={()=>setIsOpen(false)}
        subtitleText={subTitleUsuarios}
        loadData={cargarUsuarioss}
        isNew={isNewUsuarios}
        id={idUsuarios}
      />
    </>
  )
}

export default Usuarios
