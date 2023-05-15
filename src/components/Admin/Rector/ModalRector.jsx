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
import useLoadRector from '../../Hooks/Rector/useLoadRector';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageRector} from "../../Common/errorMessage";

const ModalRector = ({
    t, // from withTranslation
    isOpen,
    rectorData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const {rector, loading:loadingRector, userAvailable} = useLoadRector(id, rectorData);
    useEffect(()=>{
        if(rector){
            setSelectedEmployee({...rector})
        }
    }, [rector])
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
                    (loadingRector || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && rector?.id ? `${t("Rector update")} - ${rector.codRector}` :
                        t("Rector create")
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
                    codRector:  selectedEmployee?.codRector || "",

                }}
                validationSchema={Yup.object().shape({
                codRector: Yup.string()
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
                    {/* cod rector */}
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label className="form-label">{"Codigo Rector"}</Label>
                                <Field
                                    name="codRector"
                                    type="text"
                                    placeholder=""
                                    className={
                                        "form-control" +
                                        (errors.codRector && touched.codRector
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="codRector"
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
                        <CustomButton type="submit" color="primary" loading={loading} disabled={loadingRector || loading}>
                            {t("Send")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedEmployee(null)
                            setSelectedUsers([])
                            handleClickClose()
                        }} disabled={loadingRector || loading}>
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

ModalRector.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    rectorData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalRector)
