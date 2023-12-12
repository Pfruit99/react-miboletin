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
import useLoadCurso from '../../Hooks/Curso/useLoadCurso';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageCurso} from "../../Common/errorMessage";
import moment from 'moment';
import useLoadInstituciones from '../../Hooks/Institucion/useLoadInstituciones';

const grados = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Septimo", "Octavo", "Noveno", "Decimo", "Once"].map(grado => ({label: grado, value: grado}));

const ModalCurso = ({
    t, // from withTranslation
    isOpen,
    cursoData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [institucionId, setInstitucionId] = useState(null);
    const [selectedAsignaturas, setSelectedAsignaturas] = useState([]);
    const {curso, loading:loadingCurso, asignaturas } = useLoadCurso(id, cursoData);
    const { instituciones } = useLoadInstituciones()
    useEffect(()=>{
        if(curso){
            setSelectedCurso({...curso})
            setSelectedAsignaturas(curso.asignaturas.map(as => as.id))
        }
    }, [curso])
    useEffect(()=>{
        if(instituciones.length > 0){
            setInstitucionId(instituciones[0].value)
        }
    },[instituciones])
    const onChange = (e) => {
        setSelectedAsignaturas(e)
    }
  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={() => {
            setSelectedCurso(null)
            setSelectedAsignaturas([])
            togModal()
        }}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loadingCurso || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && curso?.id ? `${t("Actualizar curso")} - ${curso.nombre}` :
                        t("Nuevo Curso")
                }
            </h5>
            <button
                onClick={() => {
                    setSelectedCurso(null)
                    setSelectedAsignaturas([])
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
                    id:  selectedCurso?.id || "",
                    grado:  selectedCurso?.grado || "",
                    fechaInicio:  selectedCurso?.fechaInicio || "",
                    fechaFin:  selectedCurso?.fechaFin || "",
                    institucionId: institucionId || selectedCurso?.institucion.id || "0",
                    nombre: selectedCurso?.nombre || "",

                }}
                validationSchema={Yup.object().shape({
                grado: Yup.string()
                    .required(t("Value required")),
                fechaInicio: Yup.date()
                    .required(t("Value required")),
                fechaFin: Yup.date()
                    .required(t("Value required"))
                    .min(
                        Yup.ref('fechaInicio'),
                        ({min}) => min ? `La fecha necesita ser despues de ${moment(min).format('YYYY/MM/DD')}` : 'Por favor escoja una fecha inicial'
                    ),
                institucionId: Yup.string()
                    .required(t("Value required"))
                    .oneOf(instituciones.map(i => `${i.value}`)),


                })}
                onSubmit={values => {
                    if(selectedAsignaturas.length === 0) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione al menos una asignatura"})
                    values.institucionId = +values.institucionId
                    handleSubmit({...values, asignaturasId: selectedAsignaturas },id)
                    setSelectedCurso(null)
                    setSelectedAsignaturas([])
                }}
            >
                {({ errors, status, touched, setFieldValue }) => (
                <Form className="needs-validation">
                    {/* grado y fechas */}
                    <Row>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Institucion"}</Label>
                                <Field
                                    name="institucionId"
                                    as="select"
                                    disabled={true}
                                    className={
                                        "form-control" +
                                        (errors.institucionId && touched.institucionId
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {instituciones.map(institucion => (
                                        <option key={institucion.value} value={`${institucion.value}`}>{institucion.label}-{institucion.value}</option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="institucionId"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Grado"}</Label>
                                <Field
                                    name="grado"
                                    as="select"
                                    className={
                                        "form-control" +
                                        (errors.grado && touched.grado
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {grados.map(grado => (
                                        <option value={grado.value} key={grado.value}>{grado.label}</option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="grado"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Nombre"}</Label>
                                <Field
                                    name="nombre"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.nombre && touched.nombre
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="nombre"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>

                    </Row>
                    {/* fechas */}
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Fecha Inicio"}</Label>
                                <Field
                                    name="fechaInicio"
                                    type="date"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.fechaInicio && touched.fechaInicio
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="fechaInicio"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Fecha Fin"}</Label>
                                <Field
                                    name="fechaFin"
                                    type="date"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.fechaFin && touched.fechaFin
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="fechaFin"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* Asignaturas */}
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label className="form-label">{"Asignaturas"}</Label>
                                <TransferList
                                    canFilter
                                    filterCallback={(Optgroup, filterInput) => {
                                        if (filterInput === '') {
                                            return true;
                                        }
                                        return (new RegExp(filterInput, 'i')).test(Optgroup.label);
                                    }}
                                    filterPlaceholder={`${t("Search")}...`}
                                    options={asignaturas}
                                    selected={selectedAsignaturas}
                                    onChange={onChange}
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <CustomButton type="submit" color="primary" loading={loading} disabled={loadingCurso || loading}>
                            {t("Send")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedCurso(null)
                            setSelectedAsignaturas([])
                            handleClickClose()
                        }} disabled={loadingCurso || loading}>
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

ModalCurso.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    cursoData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalCurso)
