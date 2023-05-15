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
import useLoadUser from '../../Hooks/User/useLoadUser';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageUser} from "../../Common/errorMessage";

const ModalUser = ({
    t, // from withTranslation
    isOpen,
    userData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const {user, loading:loadingUser, roles} = useLoadUser(id, userData);
    useEffect(()=>{
        if(user){
            setSelectedEmployee({...user})
            setSelectedRoles(user.roles)
        }
    }, [user])
    const onChange = (e) => {
        setSelectedRoles(e)
    }
  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={() => {
            setSelectedEmployee(null)
            setSelectedRoles([])
            togModal()
        }}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loadingUser || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && user?.id ? `${t("User update")} - ${user.nombreUsuario}` :
                        t("User create")
                }
            </h5>
            <button
                onClick={() => {
                    setSelectedEmployee(null)
                    setSelectedRoles([])
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
                    correo:  selectedEmployee?.correo || "",
                    nombre:  selectedEmployee?.nombre || "",
                    apellido:  selectedEmployee?.apellido || "",
                    nombreUsuario:  selectedEmployee?.nombreUsuario || "",
                    identificacion:  selectedEmployee?.identificacion || "",
                    tipoIdentificacion:  selectedEmployee?.tipoIdentificacion || "",
                    clave: "",
                }}
                validationSchema={Yup.object().shape({
                correo: Yup.string()
                    .email("Debe ser un email valido")
                    .max(200)
                    .required(t("Value required")),
                nombre: Yup.string()
                    .required(t("Value required")),
                apellido: Yup.string()
                    .required(t("Value required")),
                nombreUsuario: Yup.string()
                    .required(t("Value required")),
                identificacion: Yup.string()
                    .required(t("Value required")),
                tipoIdentificacion: Yup.string()
                    .required(t("Value required"))
                    .oneOf(["cc", "ti", "ce"]),

                })}
                onSubmit={values => {
                    if(selectedRoles.length === 0) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione al menos 1 rol"})
                    const roles = selectedRoles
                    handleSubmit({...values, roles},id)
                    setSelectedEmployee(null)
                    setSelectedRoles([])
                }}
            >
                {({ errors, status, touched, setFieldValue }) => (
                <Form className="needs-validation">
                    {/* nombre, apellido */}
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Nombre"}</Label>
                                <Field
                                    name="nombre"
                                    type="text"
                                    placeholder="john"
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
                                <Label className="form-label">{"Apellido"}</Label>
                                <Field
                                    name="apellido"
                                    type="text"
                                    placeholder="Doe"
                                    className={
                                        "form-control" +
                                        (errors.apellido && touched.apellido
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="apellido"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* usuario correo */}
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Usuario"}</Label>
                                <Field
                                    name="nombreUsuario"
                                    type="text"
                                    placeholder="usuario"
                                    className={
                                        "form-control" +
                                        (errors.nombreUsuario && touched.nombreUsuario
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="nombreUsuario"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{t("Email")}</Label>
                                <Field
                                    name="correo"
                                    type="text"
                                    placeholder="ejemplo@ejemplo.com"
                                    className={
                                        "form-control" +
                                        (errors.correo && touched.correo
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="correo"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* identificacion */}
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Tipo Identificacion"}</Label>
                                <Field
                                    name="tipoIdentificacion"
                                    as="select"
                                    className={
                                        "form-control" +
                                        (errors.tipoIdentificacion && touched.tipoIdentificacion
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    <option value="cc">CC</option>
                                    <option value="ti">TI</option>
                                    <option value="ce">Cedula Extranjeria</option>

                                </Field>
                                <ErrorMessage
                                    name="tipoIdentificacion"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Identificación"}</Label>
                                <Field
                                    name="identificacion"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.identificacion && touched.identificacion
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="identificacion"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* clave */}
                    {
                        !id &&
                        <Row>
                            <Col lg={12}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Clave"}</Label>
                                    <Field
                                        name="clave"
                                        type="password"
                                        className={
                                            "form-control" +
                                            (errors.clave && touched.clave
                                                ? " is-invalid"
                                                : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="clave"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                    }
                    {/* Roles */}
                    <Row>
                        <Col lg="12">
                            <div className="mb-3">
                                <Label className="form-label">{t("Role")}</Label>
                                <TransferList
                                    canFilter
                                    filterCallback={(Optgroup, filterInput) => {
                                        if (filterInput === '') {
                                            return true;
                                        }
                                        return (new RegExp(filterInput, 'i')).test(Optgroup.label);
                                    }}
                                    filterPlaceholder={`${t("Search")}...`}
                                    options={roles}
                                    selected={selectedRoles}
                                    onChange={onChange}
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <CustomButton type="submit" color="primary" loading={loading} disabled={loadingUser || loading}>
                            {t("Send")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedEmployee(null)
                            setSelectedRoles([])
                            handleClickClose()
                        }} disabled={loadingUser || loading}>
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

ModalUser.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    userData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalUser)
