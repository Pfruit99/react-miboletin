import { Dispatch, SetStateAction } from 'react';
import ActionsButtons from './components/ActionsButtons';

export const UsuariosColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setSubTitleUsuario: Dispatch<SetStateAction<string>>,
  setIsNewUsuario: Dispatch<SetStateAction<boolean>>,
  setIdUsuario: Dispatch<SetStateAction<number | null>>,
) => [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Id_Usuario",
    accessor: "id_Usuario"
  },
  {
    Header: "Usuario",
    accessor: "usuario"
  },
  {
    Header: "Clave",
    accessor: "clave"
  },
  {
    Header: "FechaActualizacion",
    accessor: "fecha_Actualizacion"
  },
  {
    Header: "Acciones",
    Cell: ({ cell }: {cell:any}) => <ActionsButtons cell={cell} openEditModal={()=>{
      setSubTitleUsuario(`Editar usuario ${cell.row.original.id_usuario} ${cell.row.original.usuario}`);
      setIsNewUsuario(false);
      setIdUsuario(cell.row.original.id);
      setIsOpen(true);
    }}/>
  }
];
