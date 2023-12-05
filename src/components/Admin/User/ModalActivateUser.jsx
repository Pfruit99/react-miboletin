import React from 'react';
// Bootstrap components
import { Modal, Label, Button, Row, Col } from 'reactstrap';
// Forms
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//I18N
import { withTranslation } from "react-i18next";
import CustomButton from '../../Common/CustomButton';
import useLoadUser from '../../Hooks/User/useLoadUser';

const ModalActivateUser = ({
    t, // from withTranslation
    isOpen,
    togModal,
    handleClickClose,
    handleSubmit,
    loading,
    id
}) => {
    const {user, loading:loadingUser} = useLoadUser(id);
    console.log('user', user);
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
                    (loading || loadingUser) ? <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> : `${+user?.isActive === 1 ? t("To inactive"):t("To active")} - ${user?.nombreUsuario}`
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
                    +user?.isActive === 1 ? t("User whish inactivate") : t("User whish activate")
                }</span>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-4">
            <CustomButton type="button" color={+user?.isActive === 1 ? "danger":"success"} loading={loading} disabled={loading || loadingUser} onClick={() => handleSubmit(user.id, {isActive: !user.isActive})}>
                {+user?.isActive === 1 ? t("To inactive"):t("To active")}
            </CustomButton>{" "}
            <CustomButton type="reset" color="secondary" onClick={handleClickClose} disabled={loading || loadingUser}>
                {t("Cancel")}
            </CustomButton>
            </div>
        </div>
    </Modal>
  )
}

export default withTranslation()(ModalActivateUser)
