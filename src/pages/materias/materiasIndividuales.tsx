import React from "react";
import { materia } from "./materias.model.d";


export default function materiasIndividual(props: materiasIndividualProps) {
      // const construirLink = () => `/materia/${props.materias.Id}`;
        // {construirLink()}

      return(

<div className="">
  <header>
    <h1 className="text-center text-light">Crud</h1>
    <h2 className="text-center text-light">Crud con datatables (Asignatura)</h2>
  </header>
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <button id="btnNuevo" type="button" className="btn btn-success" data-toggle="modal">nuevo</button>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="table-responsive">
          <table id="tablaAsignatura" className="table table-striped table-bordered table-condensed" style={{width: '100%'}}>
            <thead className="text-center thead-dark">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>DocenteId</th>
                <th>HoraAsignatura</th>
                <th>Periodo</th>
                <th>Area</th>
                <th>acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td>
                  <div className="text-center">
                    <div className="btn-group">
                      <button className="btn btn-primary btnEditar">editar</button>
                      <button className="btn btn-danger btnBorrar">borrar</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  {/* Modal */}
  <div className="modal fade" id="modalCRUD" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="Modallabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="Modallabel">Modal title</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <form id="formasignatura">
            <div className="form-group">
              <label  className="col-form-label">Id rol:</label>
              <input type="number" className="form-control" id="IdRol" />
            </div>
            <div className="form-group">
              <label  className="col-form-label">Estado:</label>
              <input type="text" className="form-control" id="EstadoRol" />
            </div>
            <div className="form-group">
              <label className="col-form-label">Observaciones</label>
              <input type="datetime" className="form-control" id="ObservacionesRol" />
            </div>
            <div className="form-group">
              <label  className="col-form-label">Descripcion</label>
              <input type="datetime" className="form-control" id="DescripcionRol" />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</div>



    )
}

interface materiasIndividualProps{
    materias: materia;
}