import { Dispatch, SetStateAction } from 'react';
import ActionsButtons from './components/ActionsButtons';

export const DocenteColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setSubTitleDocente: Dispatch<SetStateAction<string>>,
  setIsNewDocente: Dispatch<SetStateAction<boolean>>,
  setIdDocente: Dispatch<SetStateAction<number | null>>,
) => [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Nombre",
    accessor: "nombre"
  },
  {
    Header: "Apellido",
    accessor: "apellido"
  },
  {
    Header: "Correo",
    accessor: "correo"
  },
  {
    Header: "Direccion",
    accessor: "direccion"
  },
  {
    Header: "Identificacion",
    accessor: "identificacion"
  },
  {
    Header: "Acciones",
    Cell: ({ cell }: {cell:any}) => <ActionsButtons cell={cell} openEditModal={()=>{
      setSubTitleDocente(`Editar docente ${cell.row.original.nombre} ${cell.row.original.apellido}`);
      setIsNewDocente(false);
      setIdDocente(cell.row.original.id);
      setIsOpen(true);
    }}/>
  }
];
