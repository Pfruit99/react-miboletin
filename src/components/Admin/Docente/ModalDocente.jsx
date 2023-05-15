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
import useLoadDocente from '../../Hooks/Docente/useLoadDocente';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageDocente} from "../../Common/errorMessage";

const ModalDocente = ({
    t, // from withTranslation
    isOpen,
    docenteData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const {docente, loading:loadingDocente, userAvailable} = useLoadDocente(id, docenteData);
    useEffect(()=>{
        if(docente){
            setSelectedEmployee({...docente})
        }
    }, [docente])
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
                    (loadingDocente || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && docente?.id ? `${t("Docente update")} - ${docente.codDocente}` :
                        t("Docente create")
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
                    codDocente:  selectedEmployee?.codDocente || "",

                }}
                validationSchema={Yup.object().shape({
                codDocente: Yup.string()
                    .max(5, 'Maximo 5 caracteres')
                    .required(t("Value required")),

                })}
                onSubmit={values => {
                    if(selectedUsers.length === 0 && !id) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione al menos 1 usuario"})
                    const usuarioId = selectedUsers[0];
                    handleSubmit({...values, usuarioId},id)
                    setSelectedEmployee(null)
                    setSelectedUsers([])
                }}
            >
                {({ errors, status, touched, setFieldValue }) => (
                <Form className="needs-validation">
                    {/* cod docente */}
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label className="form-label">{"Codigo Docente"}</Label>
                                <Field
                                    name="codDocente"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.codDocente && touched.codDocente
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="codDocente"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* usuario */}
                    {
                        !id &&
                            <Row>
                                <Col lg="12">
                                    <div className="mb-3">
                                        <Label className="form-label">{"Usuario"}</Label>
                                        <TransferList
                                            canFilter
                                            filterCallback={(Optgroup, filterInput) => {
                                                if (filterInput === '') {
                                                    return true;
                                                }
                                                return (new RegExp(filterInput, 'i')).test(Optgroup.label);
                                            }}
                                            filterPlaceholder={`${t("Search")}...`}
                                            options={userAvailable}
                                            selected={selectedUsers}
                                            onChange={onChange}
                                        />
                                    </div>
                                </Col>
                            </Row>
                    }

                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <CustomButton type="submit" color="primary" loading={loading} disabled={loadingDocente || loading}>
                            {t("Send")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedEmployee(null)
                            setSelectedUsers([])
                            handleClickClose()
                        }} disabled={loadingDocente || loading}>
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

ModalDocente.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    docenteData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalDocente)
