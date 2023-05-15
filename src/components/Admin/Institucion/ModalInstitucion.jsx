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
import useLoadInstitucion from '../../Hooks/Institucion/useLoadInstitucion';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageInstitucion} from "../../Common/errorMessage";

const ModalInstitucion = ({
    t, // from withTranslation
    isOpen,
    institucionData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const {institucion, loading:loadingInstitucion } = useLoadInstitucion(id, institucionData);
    useEffect(()=>{
        if(institucion){
            setSelectedEmployee({...institucion})
        }
    }, [institucion])
    const onChange = (e) => {
        if(e.length > 1 || selectedUsers.length > 1)
            return showToast({toastType:'error',title:"Error",message:"Solo se escoje un usuario"})
        setSelectedUsers(e)
    }
  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={() => {
            setSelectedEmployee(null)
            setSelectedUsers([])
            togModal()
        }}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loadingInstitucion || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && institucion?.id ? `${t("Actualizar institucion")} - ${institucion.nit}` :
                        t("Nueva Institución")
                }
            </h5>
            <button
                onClick={() => {
                    setSelectedEmployee(null)
                    setSelectedUsers([])
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
                    id:  selectedEmployee?.id || "",
                    nombre:  selectedEmployee?.nombre || "",
                    direccion:  selectedEmployee?.direccion || "",
                    nit:  selectedEmployee?.nit || "",

                }}
                validationSchema={Yup.object().shape({
                nombre: Yup.string()
                    .required(t("Value required")),
                direccion: Yup.string()
                    .required(t("Value required")),
                nit: Yup.string()
                    .required(t("Value required")),

                })}
                onSubmit={values => {
                    handleSubmit({...values },id)
                    setSelectedEmployee(null)
                    setSelectedUsers([])
                }}
            >
                {({ errors, status, touched, setFieldValue }) => (
                <Form className="needs-validation">
                    {/* nombre direccion */}
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
                                <Label className="form-label">{"Direccion"}</Label>
                                <Field
                                    name="direccion"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.direccion && touched.direccion
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="direccion"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* nit */}
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label className="form-label">{"NIT"}</Label>
                                <Field
                                    name="nit"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.nit && touched.nit
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="nit"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <CustomButton type="submit" color="primary" loading={loading} disabled={loadingInstitucion || loading}>
                            {t("Send")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedEmployee(null)
                            setSelectedUsers([])
                            handleClickClose()
                        }} disabled={loadingInstitucion || loading}>
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

ModalInstitucion.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    institucionData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalInstitucion)
