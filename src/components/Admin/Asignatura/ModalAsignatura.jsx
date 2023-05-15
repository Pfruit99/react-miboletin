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
import useLoadAsignatura from '../../Hooks/Asignatura/useLoadAsignatura';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageAsignatura} from "../../Common/errorMessage";
import moment from 'moment';
import useLoadInstituciones from '../../Hooks/Institucion/useLoadInstituciones';
import useLoadDocentes from '../../Hooks/Docente/useLoadDocentes';

const ModalAsignatura = ({
    t, // from withTranslation
    isOpen,
    asignaturaData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [selectedAsignatura, setSelectedAsignatura] = useState(null);
    const [selectedCursos, setSelectedCursos] = useState([]);
    const {asignatura, loading:loadingAsignatura, cursos } = useLoadAsignatura(id, asignaturaData);
    const { instituciones } = useLoadInstituciones();
    const { docentes } = useLoadDocentes()
    console.log('asignatura', asignatura)
    useEffect(()=>{
        if(asignatura){
            setSelectedAsignatura({...asignatura, docenteId: asignatura?.docente?.id, institucionId: asignatura?.institucion?.id})
            setSelectedCursos(asignatura.cursos.map(c => c.id))
        }
    }, [asignatura])
    const onChange = (e) => {
        setSelectedCursos(e)
    }
  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={() => {
            setSelectedAsignatura(null)
            setSelectedCursos([])
            togModal()
        }}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loadingAsignatura || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && asignatura?.id ? `${t("Actualizar asignatura")} - ${asignatura.nombre}` :
                        t("Nueva Asignatura")
                }
            </h5>
            <button
                onClick={() => {
                    setSelectedAsignatura(null)
                    setSelectedCursos([])
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
                    id:  selectedAsignatura?.id || "",
                    nombre:  selectedAsignatura?.nombre || "",
                    periodo:  selectedAsignatura?.periodo || "",
                    area:  selectedAsignatura?.area || "",
                    horaAsignatura:  selectedAsignatura?.horaAsignatura || "",
                    docenteId:  selectedAsignatura?.docenteId || "0",
                    institucionId: selectedAsignatura?.institucionId || "0",
                }}
                validationSchema={Yup.object().shape({
                nombre: Yup.string()
                    .required(t("Value required")),
                periodo: Yup.string()
                    .required(t("Value required")),
                area: Yup.string()
                    .required(t("Value required")),
                institucionId: Yup.string()
                    .required(t("Value required"))
                    .oneOf(instituciones.map(i => `${i.value}`)),
                docenteId: Yup.string()
                    .required(t("Value required"))
                    .oneOf(docentes.map(i => `${i.value}`)),


                })}
                onSubmit={values => {
                    if(selectedCursos.length === 0) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione al menos 1 curso"})
                    values.institucionId = +values.institucionId
                    values.docenteId = +values.docenteId
                    values.periodo = +values.periodo;
                    handleSubmit({...values, cursosId: selectedCursos },id)
                    setSelectedAsignatura(null)
                    setSelectedCursos([])
                }}
            >
                {({ errors, status, touched, setFieldValue }) => (
                <Form className="needs-validation">
                    {/* nombre y horas */}
                    <Row>
                        <Col lg={6}>
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
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Hora asignatura"}</Label>
                                <Field
                                    name="horaAsignatura"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.horaAsignatura && touched.horaAsignatura
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="horaAsignatura"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>

                    </Row>
                    {/* periodo y area */}
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Periodo"}</Label>
                                <Field
                                    name="periodo"
                                    type="number"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.periodo && touched.periodo
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="periodo"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Area"}</Label>
                                <Field
                                    name="area"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.area && touched.area
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="area"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* institucion y docente */}
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Institucion"}</Label>
                                <Field
                                    name="institucionId"
                                    as="select"
                                    className={
                                        "form-control" +
                                        (errors.institucionId && touched.institucionId
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {instituciones.map(inst => (
                                        <option value={inst.value} key={inst.value}>{inst.label}</option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="institucionId"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Docente"}</Label>
                                <Field
                                    name="docenteId"
                                    as="select"
                                    className={
                                        "form-control" +
                                        (errors.docenteId && touched.docenteId
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {docentes.map(doc => (
                                        <option value={doc.value} key={doc.value}>{doc.label}</option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="docenteId"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* cursos */}
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label className="form-label">{"Cursos"}</Label>
                                <TransferList
                                    canFilter
                                    filterCallback={(Optgroup, filterInput) => {
                                        if (filterInput === '') {
                                            return true;
                                        }
                                        return (new RegExp(filterInput, 'i')).test(Optgroup.label);
                                    }}
                                    filterPlaceholder={`${t("Search")}...`}
                                    options={cursos}
                                    selected={selectedCursos}
                                    onChange={onChange}
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <CustomButton type="submit" color="primary" loading={loading} disabled={loadingAsignatura || loading}>
                            {t("Send")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedAsignatura(null)
                            setSelectedCursos([])
                            handleClickClose()
                        }} disabled={loadingAsignatura || loading}>
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

ModalAsignatura.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    asignaturaData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalAsignatura)
