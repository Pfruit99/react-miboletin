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
import useLoadRector from '../../Hooks/Rector/useLoadRector';

const ModalDeleteRector = ({
    t, // from withTranslation
    isOpen,
    togModal,
    handleClickClose,
    handleSubmit,
    loading,
    id
}) => {
    const {rector, loading:loadingRector} = useLoadRector(id);
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
                    (loading || loadingRector) ? <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> : `Rector ${rector?.id}`
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
                    '¿Desea eliminar este rector?'
                }</span>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-4">
            <CustomButton type="button" color="danger" loading={loading} disabled={loading || loadingRector} onClick={() => handleSubmit(rector.id)}>
                Eliminar
            </CustomButton>{" "}
            <CustomButton type="reset" color="secondary" onClick={handleClickClose} disabled={loading || loadingRector}>
                {t("Cancel")}
            </CustomButton>
            </div>
        </div>
    </Modal>
  )
}

ModalDeleteRector.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.any,
    togModal:  PropTypes.any,
    handleClickClose:  PropTypes.any,
    handleSubmit:  PropTypes.any,
    loading:  PropTypes.any,
    id:  PropTypes.any,
}

export default withTranslation()(ModalDeleteRector)
