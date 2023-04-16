import React from 'react'
export interface ActionButtonProps {
  cell: any;
  openEditModal: ()=>void;
}
const ActionsButtons: React.FC<ActionButtonProps> = ({
  cell,
  openEditModal
}) => {
  return (
    <div>
      <button onClick={openEditModal} className='btn btn-warning'>Editar</button>
      <button>Eliminar</button>

    </div>
  )
}

export default ActionsButtons
