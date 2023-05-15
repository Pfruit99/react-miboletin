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
import useLoadContratacion from '../../Hooks/Contratacion/useLoadContratacion';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageContratacion} from "../../Common/errorMessage";
import useLoadRectores from '../../Hooks/Rector/useLoadRectores';
import useLoadInstituciones from '../../Hooks/Institucion/useLoadInstituciones';
import useLoadDocentes from '../../Hooks/Docente/useLoadDocentes';

const ModalContratacion = ({
    t, // from withTranslation
    isOpen,
    contratacionData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [selectedContratacion, setSelectedContratacion] = useState(null);
    const {contratacion, loading:loadingContratacion } = useLoadContratacion(id, contratacionData);
    const { rectores, loading: loadingRectores } = useLoadRectores();
    const {instituciones, loading: loadingInstitucion} = useLoadInstituciones();
    const { docentes, loading: loadingDocentes } = useLoadDocentes();
    useEffect(()=>{
        if(contratacion){
            setSelectedContratacion({
                ...contratacion,
                docenteId: contratacion.docente.id,
                institucionId: contratacion.institucion.id,
                rectorId: contratacion.rector.id,
            })
        }
    }, [contratacion])
  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={() => {
            setSelectedContratacion(null)
            togModal()
        }}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loadingContratacion || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && contratacion?.id ? `${t("Actualizar contratación")} - ${contratacion.id}` :
                        t("Nueva Contratación")
                }
            </h5>
            <button
                onClick={() => {
                    setSelectedContratacion(null)
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
                    id:  selectedContratacion?.id || "",
                    tipoCargo:  selectedContratacion?.tipoCargo || "",
                    tipoContrato:  selectedContratacion?.tipoContrato || "",
                    fechaContratacion:  selectedContratacion?.fechaContratacion || "",
                    rectorId:  selectedContratacion?.rectorId || "",
                    institucionId:  selectedContratacion?.institucionId || "",
                    docenteId:  selectedContratacion?.docenteId || "",

                }}
                validationSchema={Yup.object().shape({
                tipoCargo: Yup.string()
                    .required(t("Value required")),
                tipoContrato: Yup.string()
                    .required(t("Value required")),
                fechaContratacion: Yup.string()
                    .required(t("Value required")),
                institucionId: Yup.string()
                    .required(t("Value required"))
                    .oneOf(instituciones.map(i => `${i.value}`)),
                rectorId: Yup.string()
                    .required(t("Value required"))
                    .oneOf(rectores.map(i => `${i.value}`)),
                docenteId: Yup.string()
                    .required(t("Value required"))
                    .oneOf(docentes.map(i => `${i.value}`)),


                })}
                onSubmit={values => {
                    values.docenteId = +values.docenteId;
                    values.rectorId = +values.rectorId;
                    values.institucionId = +values.institucionId;
                    handleSubmit({...values },id)
                    setSelectedContratacion(null)
                }}
            >
                {({ errors, status, touched, setFieldValue }) => (
                <Form className="needs-validation">
                    {/* cargos */}
                    <Row>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Tipo Cargo"}</Label>
                                <Field
                                    name="tipoCargo"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.tipoCargo && touched.tipoCargo
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="tipoCargo"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Tipo Contrato"}</Label>
                                <Field
                                    name="tipoContrato"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.tipoContrato && touched.tipoContrato
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="tipoContrato"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Fecha Contratacion"}</Label>
                                <Field
                                    name="fechaContratacion"
                                    type="date"
                                    placeholder=""
                                    // onChange={(e)=>{
                                    //     console.log('e', e.target.value)
                                    // }}
                                    className={
                                        "form-control" +
                                        (errors.fechaContratacion && touched.fechaContratacion
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="fechaContratacion"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* institucion corre */}
                    <Row>
                        <Col lg={4}>
                            <div className="mb-3">
                                <Label className="form-label">{"Rector"}</Label>
                                <Field
                                    name="rectorId"
                                    as="select"
                                    className={
                                        "form-control" +
                                        (errors.rectorId && touched.rectorId
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {rectores.map(rector => (
                                        <option key={rector.value} value={rector.value}>{rector.label}</option>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="rectorId"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={4}>
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
                                    {instituciones.map(institucion => (
                                        <option key={institucion.value} value={institucion.value}>{institucion.label}</option>
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
                                    {docentes.map(docente => (
                                        <option key={docente.value} value={`${docente.value}`}>{docente.label}-{docente.value}</option>
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

                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <CustomButton type="submit" color="primary" loading={loading} disabled={loadingContratacion || loading}>
                            {t("Send")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedContratacion(null)
                            handleClickClose()
                        }} disabled={loadingContratacion || loading}>
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

ModalContratacion.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    contratacionData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalContratacion)
