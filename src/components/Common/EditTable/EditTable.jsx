import React, { useState } from 'react'
import PropTypes from 'prop-types';
import style from './editTable.scss';

const EditableTable = ({
  porcentajeNota,
  notaEstudiante,
}) => {
  const [employeeData, setEmployeeData] = notaEstudiante;

  const onChangeInput = (e, periodo) => {
    const { name, value } = e.target

    const editData = employeeData.map((item) =>
      item.periodo === periodo && name ? { ...item, [name]: value } : item
    )

    editData.map(i => {

      if(i.periodo === "total"){
        i.asistencia = ((+editData[0].asistencia + +editData[1].asistencia + +editData[2].asistencia + +editData[3].asistencia) / 4.0).toFixed(2);
        i.parcial = ((+editData[0].parcial + +editData[1].parcial + +editData[2].parcial + +editData[3].parcial) / 4.0).toFixed(2);
        i.clase = ((+editData[0].clase + +editData[1].clase + +editData[2].clase + +editData[3].clase) / 4.0).toFixed(2);
      }
      i.definitiva = ((i.asistencia * (+porcentajeNota.porcentajeAsistencia/100)) +
        (i.parcial * (+porcentajeNota.porcentajeParcial/100)) +
        (i.clase * (+porcentajeNota.porcentajeClase/100))).toFixed(2)
      return i
    })

    setEmployeeData(editData)
  }

  return (
    <div className={""}>
      <table className={"editTable"}>
        <thead>
          <tr>
            <th className={"header"}>Periodo</th>
            <th className={"header"}>Nota Actitudinal {porcentajeNota && `${porcentajeNota.porcentajeAsistencia}%`}</th>
            <th className={"header"}>Nota Procedimental {porcentajeNota && `${porcentajeNota.porcentajeParcial}%`}</th>
            <th className={"header"}>Nota Cognitiva {porcentajeNota && `${porcentajeNota.porcentajeClase}%`}</th>
            <th className={"header"}>Definitiva</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(({ periodo, asistencia, parcial, clase, definitiva }) => (
            <tr key={periodo}>
              <td className={"bodyTable"}>{periodo}</td>
              <td className={"bodyTable"}>
                <input
                  className={"inputEdit"}
                  name="asistencia"
                  value={asistencia}
                  type="number"
                  onChange={(e) => onChangeInput(e, periodo)}
                  disabled={periodo === "total"}
                />
              </td>
              <td className={"bodyTable"}>
                <input
                  className={"inputEdit"}
                  name="parcial"
                  value={parcial}
                  type="number"
                  onChange={(e) => onChangeInput(e, periodo)}
                  disabled={periodo === "total"}
                />
              </td>
              <td className={"bodyTable"}>
                <input
                  className={"inputEdit"}
                  name="clase"
                  type="number"
                  value={clase}
                  disabled={periodo === "total"}
                  onChange={(e) => onChangeInput(e, periodo)}
                />
              </td>
              <td className={"bodyTable"}>
                <input
                  className={"inputEdit"}
                  name="definitiva"
                  type="number"
                  value={definitiva}
                  disabled
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

EditableTable.propTypes = {
  porcentajeNota: PropTypes.any,
  notaEstudiante: PropTypes.any,
}
export default EditableTable
