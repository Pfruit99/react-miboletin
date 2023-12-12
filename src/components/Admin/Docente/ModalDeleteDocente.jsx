import React from 'react';
// Bootstrap components
import { Modal, Label, Button, Row, Col } from 'reactstrap';
// Forms
import { Formik, Field, Form, ErrorMessage } from "formik";
import PropTypes from 'prop-types';
import * as Yup from "yup";
//I18N
import { withTranslation } from "react-i18next";
import CustomButton from '../../Common/CustomButton';
import useLoadDocente from '../../Hooks/Docente/useLoadDocente';

const ModalActivateDocente = ({
    t, // from withTranslation
    isOpen,
    togModal,
    handleClickClose,
    handleSubmit,
    loading,
    id
}) => {
    const {docente, loading:loadingDocente} = useLoadDocente(id);
  return (
    <Modal
        backdrop="static"
        size="md"
        isOpen={isOpen}
        toggle={togModal}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loading || loadingDocente) ? <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> : `Docente ${docente?.id}`
                }
            </h5>
            <button
                onClick={handleClickClose}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body p-10">
            <div className=''>
                <span>{
                    '¿Desea eliminar este docente?'
                }</span>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-4">
            <CustomButton type="button" color="danger" loading={loading} disabled={loading || loadingDocente} onClick={() => handleSubmit(docente.id)}>
                Eliminar
            </CustomButton>{" "}
            <CustomButton type="reset" color="secondary" onClick={handleClickClose} disabled={loading || loadingDocente}>
                {t("Cancel")}
            </CustomButton>
            </div>
        </div>
    </Modal>
  )
}

ModalActivateDocente.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.any,
    togModal:  PropTypes.any,
    handleClickClose:  PropTypes.any,
    handleSubmit:  PropTypes.any,
    loading:  PropTypes.any,
    id:  PropTypes.any,
}

export default withTranslation()(ModalActivateDocente)
