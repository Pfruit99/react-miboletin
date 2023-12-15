import React from 'react';
// Bootstrap components
import { Modal, Label, Button, Row, Col } from 'reactstrap';
// Forms
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//I18N
import { withTranslation } from "react-i18next";
import CustomButton from '../../Common/CustomButton';
import useLoadPeriodo from '../../Hooks/Periodo/useLoadPeriodo';
import PropTypes from 'prop-types';


const ModalActivatePeriodo = ({
    t, // from withTranslation
    isOpen,
    togModal,
    handleClickClose,
    handleSubmit,
    loading,
    id
}) => {
    const {periodo, loading:loadingPeriodo} = useLoadPeriodo(id);
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
                    (loading || loadingPeriodo) ? <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> : `${+periodo?.activo === 1 ? t("To inactive"):t("To active")} - ${periodo?.nombre}`
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
                    +periodo?.activo === 1 ? t("Periodo whish inactivate") : t("Periodo whish activate")
                }</span>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-4">
            <CustomButton type="button" color={+periodo?.activo === 1 ? "danger":"success"} loading={loading} disabled={loading || loadingPeriodo} onClick={() => handleSubmit(periodo.id, {activo: !periodo.activo})}>
                {+periodo?.activo === 1 ? t("To inactive"):t("To active")}
            </CustomButton>{" "}
            <CustomButton type="reset" color="secondary" onClick={handleClickClose} disabled={loading || loadingPeriodo}>
                {t("Cancel")}
            </CustomButton>
            </div>
        </div>
    </Modal>
  )
}
ModalActivatePeriodo.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalActivatePeriodo)
