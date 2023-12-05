import React, {useEffect, useState} from 'react';
// Bootstrap components
import { Modal, Label, Button, Row, Col } from 'reactstrap';
// Forms
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//I18N
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import CustomButton from '../../Common/CustomButton';
import useLoadNota from '../../Hooks/Nota/useLoadNota';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageNota} from "../../Common/errorMessage";
import moment from 'moment';
import useLoadInstituciones from '../../Hooks/Institucion/useLoadInstituciones';
import useLoadDocentes from '../../Hooks/Docente/useLoadDocentes';
import useLoadAsignaturaByInstitucion from '../../Hooks/Asignatura/useLoadAsignaturaByInstitucion';
import useLoadCursoByInstitucion from '../../Hooks/Curso/useLoadCursoByInstitucion';
import useLoadEstudianteByCurso from '../../Hooks/Estudiante/useLoadEstudianteByCurso';
import EditableTable from '../../Common/EditTable/EditTable';
const data = [
    {
      periodo: 1,
      asistencia: 0,
      parcial: 0,
      clase: 0,
      definitiva: 0,
    },
    {
      periodo: 2,
      asistencia: 0,
      parcial: 0,
      clase: 0,
      definitiva: 0,
    },
    {
      periodo: 3,
      asistencia: 0,
      parcial: 0,
      clase: 0,
      definitiva: 0,
    },
    {
      periodo: 4,
      asistencia: 0,
      parcial: 0,
      clase: 0,
      definitiva: 0,
    },
    {
      periodo: "total",
      asistencia: 0,
      parcial: 0,
      clase: 0,
      definitiva: 0,
    },
  ]
const ModalNota = ({
    t, // from withTranslation
    isOpen,
    notaData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [notasEstudiante, setNotasEstudiante] = useState(data);
    const [selectedNota, setSelectedNota] = useState(null);
    const [selectedCursos, setSelectedCursos] = useState([]);
    const [selectedInstitu, setSelectedInstitu] = useState(0)
    const [selectedCurso, setSelectedCurso] = useState(0)
    const [institucionId, setInstitucionId] = useState(null);
    const {nota, loading:loadingNota } = useLoadNota(id, notaData);
    const { instituciones } = useLoadInstituciones();
    const { docentes } = useLoadDocentes();
    const {asignaturas, porcentajesNota} = useLoadAsignaturaByInstitucion(selectedInstitu, selectedCurso);
    const {cursos} = useLoadCursoByInstitucion(selectedInstitu);
    const {estudiantes} = useLoadEstudianteByCurso(selectedCurso);
    useEffect(()=>{
        if(instituciones.length > 0){
            setInstitucionId(instituciones[0].value)
            setSelectedInstitu(instituciones[0].value)
        }
    },[instituciones])
    useEffect(()=>{
        if(nota){
            setSelectedNota({
                ...nota,
                asignaturaId: nota?.asignatura?.id,
                estudianteId: nota?.estudiante?.id,
                cursoId: nota?.asignatura?.cursos[0]?.id,
                institucionId: nota?.asignatura?.cursos[0]?.institucion?.id,
            })
            setSelectedInstitu(nota?.asignatura?.cursos[0]?.institucion?.id);
            setSelectedCurso(nota?.asignatura?.cursos[0]?.id)
            setNotasEstudiante(nota.observacionNota ? JSON.parse(nota.observacionNota) : data)
        }
    }, [nota])
    useEffect(()=> {
        if(!id) setNotasEstudiante(data);
    },[id])
    const onChange = (e) => {
        setSelectedCursos(e)
    }

  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={() => {
            setSelectedNota(null)
            setSelectedCursos([])
            setSelectedCurso(0)
            togModal()
        }}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loadingNota || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && nota?.id ? `${t("Actualizar Valoración")} - ${nota.estudiante.usuario.nombre} / ${nota.asignatura.nombre.nombre}` :
                        t("Nueva Valoración")
                }
            </h5>
            <button
                onClick={() => {
                    setSelectedNota(null)
                    setSelectedCursos([])
                    setSelectedInstitu(0)
                    setSelectedCurso(0)
                    handleClickClose()
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body p-10">
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id:  selectedNota?.id || "",
                    asignaturaId:  selectedNota?.asignaturaId || "",
                    estudianteId:  selectedNota?.estudianteId || "",
                    institucionId: institucionId || selectedNota?.institucionId || "",
                    cursoId:  selectedNota?.cursoId || "",
                    observaciones:  selectedNota?.observaciones || "",


                }}
                validationSchema={Yup.object().shape({
                asignaturaId: Yup.string()
                    .required(t("Value required")),
                estudianteId: Yup.string()
                    .required(t("Value required")),


                })}
                onSubmit={values => {
                    const asistencia = +notasEstudiante[4].asistencia;
                    const parcial = +notasEstudiante[4].parcial;
                    const clase = +notasEstudiante[4].clase;
                    const definitiva = +notasEstudiante[4].definitiva;
                    if(!asistencia || !parcial || !clase || !definitiva)
                    return showToast({toastType:'error',title:"Error",message:"Por favor ingrese al menos 1 nota"})
                    delete values.periodo;
                    delete values.institucionId;
                    values.cursoId = +values.cursoId;
                    values.asignaturaId = +values.asignaturaId;
                    values.estudianteId = +values.estudianteId;
                    values.observacionNota = JSON.stringify(notasEstudiante);
                    values.notaAsistencia = asistencia;
                    values.notaParcial = parcial;
                    values.notaClase = clase;
                    values.notaDefinitiva = definitiva;
                    handleSubmit({...values },id)
                    setSelectedNota(null)
                    setSelectedCursos([])
                    setSelectedCurso(0)
                }}
            >
                {({ errors, status, touched, setFieldValue, values }) => (
                <Form className="needs-validation">
                    {/* Institucion if adimn */}
                    {
                        true &&
                        <Row>
                            <Col lg={12}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Institucion"}</Label>
                                    <Field
                                        name="institucionId"
                                        as="select"
                                        disabled={true}
                                        onChange={(e)=>{
                                            setFieldValue('institucionId', e.target.value);
                                            setSelectedInstitu(+e.target.value);
                                        }}
                                        className={
                                            "form-control" +
                                            (errors.institucionId && touched.institucionId
                                                ? " is-invalid"
                                                : "")
                                    }>
                                        <option value="0">Seleccione una Opcion</option>
                                        {instituciones.map(doc => (
                                            <option value={doc.value} key={doc.value}>{doc.label}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage
                                        name="institucionId"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                    }
                    {/* curso, asignatura, estudiante */}
                    <Row>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Curso"}</Label>
                                <Field
                                    name="cursoId"
                                    as="select"
                                    onChange={(e)=>{
                                        setFieldValue('cursoId', e.target.value);
                                        setSelectedCurso(+e.target.value);
                                        setNotasEstudiante(data);
                                    }}
                                    className={
                                        "form-control" +
                                        (errors.cursoId && touched.cursoId
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {cursos.map(doc => (
                                        <option value={doc.value} key={doc.value}>{doc.label}</option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="cursoId"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Asignatura"}</Label>
                                <Field
                                    name="asignaturaId"
                                    as="select"
                                    onChange={(e)=>{
                                        setFieldValue('asignaturaId', e.target.value);
                                        setNotasEstudiante(data);
                                    }}
                                    className={
                                        "form-control" +
                                        (errors.asignaturaId && touched.asignaturaId
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {asignaturas.map(doc => (
                                        <option value={doc.value} key={doc.value}>{doc.label}</option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="asignaturaId"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Estudiante"}</Label>
                                <Field
                                    name="estudianteId"
                                    as="select"
                                    className={
                                        "form-control" +
                                        (errors.estudianteId && touched.estudianteId
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {estudiantes.map(doc => (
                                        <option value={doc.value} key={doc.value}>{doc.label}</option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="estudianteId"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>

                    </Row>
                    {/* notas */}
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label className="form-label">{"Notas"}</Label>
                                <EditableTable
                                    notaEstudiante={[notasEstudiante, setNotasEstudiante]}
                                    porcentajeNota={porcentajesNota.find(pn => +pn.id === +values.asignaturaId)}
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* observaciones */}
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label className="form-label">{"Observaciones"}</Label>
                                <Field
                                    name="observaciones"
                                    as="textarea"
                                    className={
                                        "form-control" +
                                        (errors.observaciones  && touched.observaciones
                                            ? " is-invalid"
                                            : "")
                                } />
                                <ErrorMessage
                                    name="observaciones"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <CustomButton type="submit" color="primary" loading={loading} disabled={loadingNota || loading}>
                            {t("Send")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedNota(null)
                            setSelectedCursos([])
                            setSelectedCurso(0)
                            handleClickClose()
                        }} disabled={loadingNota || loading}>
                            {t("Cancel")}
                        </CustomButton>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    </Modal>
  )
}

ModalNota.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    notaData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalNota)
