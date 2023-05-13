import React, { useState } from 'react';
// Bootstrap components
import {Modal, Label, Button, Row, Col, Input, FormFeedback} from 'reactstrap';
// Forms
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//I18N
import { withTranslation } from "react-i18next";
import CustomButton from '../../Common/CustomButton';
import useLoadFoodType from '../../Hooks/FoodType/useLoadFoodType';
import TimePicker from '../../Common/TimePicker';
import { showToast } from '../../Common/notifications';

const ModalFoodType = ({
    t, // from withTranslation
    isOpen,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
	const {foodType, loading:loadingFoodType} = useLoadFoodType(id);
  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={togModal}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loadingFoodType || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && foodType?.id ? `${t("FoodType update")} - ${foodType.name}` :
                        t("FoodType create")
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
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name    	:  foodType?.name     		|| "",
                    initialHour	:  foodType?.initialHour	|| "00:00",
                    finalHour 	:  foodType?.finalHour  	|| "00:00",
                    colorType 	:  foodType?.colorType  	|| "primary",
                }}
                validationSchema={Yup.object().shape({
                name: Yup.string()
                .required(
                    t("Value required")
                ).max(150),
                initialHour: Yup.string().required(
                    t("Value required")
                ).max(150),
                finalHour: Yup.string().required(
                    t("Value required")
                ).max(100),
                })}
                onSubmit={values => {
                    let { initialHour, finalHour } = values;
                    initialHour = initialHour.split(":").map(c => c.padStart(2,0)).join(":")
                    finalHour = finalHour.split(":").map(c => c.padStart(2,0)).join(":")
                    if (initialHour >= finalHour) return showToast({toastType:'warning', message:t("Food type final hour must be larger than initial")});
                    handleSubmit(values,id)
                }}
            >
                {({ errors, status, touched, setFieldValue, values }) => (
                <Form className="needs-validation">
                    <Row>
                        <Col lg="6">
                            <div className="mb-3">
                                <Label className="form-label">{t("Profile names")}</Label>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder=""
                                    className={
                                    "form-control" +
                                    (errors.name && touched.name
                                        ? " is-invalid"
                                        : "")
                                    }
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg="6" className="mb-3">
                            <Row>
                                <Col xs={10}>
                                    <Label className="form-label">Color</Label>
                                    <Input
                                        type="select"
                                        name="colorType"
                                        // value={event ? event.colorType : "bg-primary"}
                                        onChange={(e)=> setFieldValue('colorType', e.target.value)}
                                        value={values.colorType || "primary"}
                                        invalid={
                                            touched.colorType && errors.colorType ? true : false
                                        }
                                    >
                                        <option value="danger">Rojo</option>
                                        <option value="success">Verde</option>
                                        <option value="primary">Azul</option>
                                        <option value="info">Azul claro</option>
                                        <option value="dark">Negro</option>
                                        <option value="warning">Amarillo</option>
                                    </Input>
                                    {touched.colorType && errors.colorType ? (
                                        <FormFeedback type="invalid">{errors.colorType}</FormFeedback>
                                    ) : null}
                                </Col>
                                <Col xs={2}>
                                    <div className={`rounded bg-${values.colorType} w-25 mt-4 p-3`} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <div className="mb-3">
                                <Label className="form-label">{t("FoodType initial hour")}</Label>
                                <TimePicker
                                    name="initialHour"
                                    errors={errors}
                                    touched={touched}
                                    setFieldValue={setFieldValue}
                                />
                                <ErrorMessage
                                    name="document"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className="mb-3">
                                <Label className="form-label">{t("FoodType final hour")}</Label>
                                <TimePicker
                                    name="finalHour"
                                    errors={errors}
                                    touched={touched}
                                    setFieldValue={setFieldValue}
                                />
                                <ErrorMessage
                                name="mobile"
                                component="div"
                                className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2 mt-4">
                    <CustomButton type="submit" color="primary" loading={loading} disabled={loadingFoodType || loading}>
                        {t("Send")}
                    </CustomButton>{" "}
                    <CustomButton type="reset" color="secondary" onClick={handleClickClose} disabled={loading}>
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

export default withTranslation()(ModalFoodType)
