import React, {useCallback, useEffect, useState} from 'react';
// Bootstrap components
import { Modal, Label, Button, Row, Col } from 'reactstrap';
// Forms
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//I18N
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import CustomButton from '../../Common/CustomButton';
import useLoadBoletin from '../../Hooks/Boletin/useLoadBoletin';
import Select from "react-select";
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageBoletin} from "../../Common/errorMessage";
import useLoadInstituciones from '../../Hooks/Institucion/useLoadInstituciones';
import useLoadAsignaturaByInstitucion from '../../Hooks/Asignatura/useLoadAsignaturaByInstitucion';
import useLoadCursoByInstitucion from '../../Hooks/Curso/useLoadCursoByInstitucion';
import useLoadEstudianteByCurso from '../../Hooks/Estudiante/useLoadEstudianteByCurso';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import GeneratedBoletin from './GenerateBoletin';
import * as helpAPI from '../../../helpers/api_helper';
import moment from 'moment';
import { connect } from "react-redux";


const ModalBoletin = ({
    t, // from withTranslation
    isOpen,
    boletinData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
    user
}) => {
    const [loadingBoletinData, setLoadingBoletinData] = useState(false)
    const [selectedBoletin, setSelectedBoletin] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedInstitu, setSelectedInstitu] = useState(0)
    const [selectedCurso, setSelectedCurso] = useState(0)
    const {boletin, loading:loadingBoletin, userAvailable} = useLoadBoletin(id, boletinData);
    const { instituciones } = useLoadInstituciones();
    const {cursos} = useLoadCursoByInstitucion(selectedInstitu);
    const {estudiantes} = useLoadEstudianteByCurso(selectedCurso);
    useEffect(() => {
        if(instituciones.length > 0) setSelectedInstitu(instituciones[0].value)
    },[instituciones])
    const loadDataFromBoletin = useCallback(async ({institucionId, cursoId, estudianteId})=>{
        try {
            setLoadingBoletinData(true);
            const dataBoletin = await helpAPI.post(`${import.meta.env.VITE_APP_BACKEND_URL}/notas/findDataToGenerate`, {institucionId, cursoId, estudianteId})
            setSelectedBoletin({
                ...dataBoletin
            })
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoadingBoletinData(false);
        }
    },[])

    useEffect(()=>{
        if(user.estudiante && user.estudiante.length > 0)
            setSelectedCurso(user.estudiante[0].curso?.id)
    },[user.estudiante])

  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={() => {
            setSelectedBoletin(null)
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
                    (loadingBoletin || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && boletin?.id ? `${t("Boletin update")} - ${boletin.codBoletin}` :
                        t("Crear Boletin")
                }
            </h5>
            <button
                onClick={() => {
                    setSelectedBoletin(null)
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
                    id:  selectedBoletin?.id || "",
                    estudianteId:  user.roles?.some(r => r.includes('estudiante')) ? user.estudiante[0]?.id : "",
                    institucionId: selectedInstitu || selectedBoletin?.institucionId || "",
                    cursoId:  selectedCurso || selectedBoletin?.cursoId || "",

                }}
                validationSchema={Yup.object().shape({

                })}
                onSubmit={values => {
                    if(selectedUsers.length === 0 && !id) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione al menos 1 usuario"})
                    const usuarioId = selectedUsers[0];
                    handleSubmit({...values, usuarioId},id)
                    setSelectedBoletin(null)
                    setSelectedUsers([])
                }}
            >
                {({ errors, status, touched, setFieldValue, values }) => (
                <Form className="needs-validation">
                {/* Institucion if adimn */}
                    {
                        true &&
                        <Row>
                            <Col lg={12}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Institucion"}</Label>
                                    <Field
                                        name="institucionId"
                                        as="select"
                                        disabled={true}
                                        onChange={(e)=>{
                                            setFieldValue('institucionId', e.target.value);
                                            setSelectedInstitu(+e.target.value);
                                        }}
                                        className={
                                            "form-control" +
                                            (errors.institucionId && touched.institucionId
                                                ? " is-invalid"
                                                : "")
                                    }>
                                        <option value="0">Seleccione una Opcion</option>
                                        {instituciones.map(doc => (
                                            <option value={doc.value} key={doc.value}>{doc.label}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage
                                        name="institucionId"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                    }
                    {/* curso, estudiante */}

                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Curso"}</Label>
                                <Field
                                    name="cursoId"
                                    as="select"
                                    disabled={user.roles?.some(r => r.includes('estudiante'))}
                                    onChange={(e)=>{
                                        setFieldValue('cursoId', e.target.value);
                                        setSelectedCurso(+e.target.value);
                                        setSelectedBoletin(null)
                                    }}
                                    className={
                                        "form-control" +
                                        (errors.cursoId && touched.cursoId
                                            ? " is-invalid"
                                            : "")
                                }>
                                    <option value="0">Seleccione una Opcion</option>
                                    {cursos.map(doc => (
                                        <option value={doc.value} key={doc.value}>{doc.label}</option>
                                    ))}

                                </Field>
                                <ErrorMessage
                                    name="cursoId"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Estudiante"}</Label>
                                    <Field
                                        name="estudianteId"
                                        as="select"
                                        disabled={user.roles?.some(r => r.includes('estudiante'))}
                                        onChange={(e)=>{
                                            setFieldValue('estudianteId', e.target.value);
                                            setSelectedBoletin(null)
                                        }}
                                        className={
                                            "form-control" +
                                            (errors.estudianteId && touched.estudianteId
                                                ? " is-invalid"
                                                : "")
                                    }>
                                        <option value="0">Seleccione una Opcion</option>
                                        {estudiantes.map(doc => (
                                            <option value={doc.value} key={doc.value}>{doc.label}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage
                                        name="estudianteId"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        {/* {
                            !user.roles?.some(r => r.includes('estudiante')) &&

                        } */}
                        {/* {
                            selectedBoletin &&
                            <Row>
                                <PDFViewer>
                                    <GeneratedBoletin
                                        dataProp={selectedBoletin}
                                    />
                                </PDFViewer>

                            </Row>
                        } */}


                    </Row>
                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <CustomButton type="button" color="primary" loading={loadingBoletinData} disabled={loadingBoletinData} onClick={()=>{
                            if(!values.institucionId) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione una institucion"})
                            if(!values.cursoId) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione un curso"})
                            if(!values.estudianteId) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione un estudiante"})
                            loadDataFromBoletin({
                                cursoId: +values.cursoId,
                                institucionId: +values.institucionId,
                                estudianteId: +values.estudianteId,
                            })
                        }}>
                            {t("Generar")}
                        </CustomButton>{" "}
                        <CustomButton type="reset" color="secondary" onClick={() => {
                            setSelectedBoletin(null)
                            setSelectedUsers([])
                            handleClickClose()
                        }} disabled={loadingBoletin || loading}>
                            {t("Cancel")}
                        </CustomButton>
                        {
                            selectedBoletin &&
                            <PDFDownloadLink document={<GeneratedBoletin dataProp={selectedBoletin} />} fileName={`boletin-${selectedBoletin.estudiante.codEstudiante}${moment().format('YYYY-MM-DD_HH:mm:ss')}.pdf`}>
                                {({ blob, url, loading, error }) => (<CustomButton type='button'  onClick={()=>handleSubmit({
                                    cursoId: +values.cursoId,
                                    institucionId: +values.institucionId,
                                    estudianteId: +values.estudianteId,
                                    userId: user?.id,
                                })}>
                                    {loading ? 'cargando Documento...' : 'Descargalo ahora!'}
                                </CustomButton>)}
                            </PDFDownloadLink>
                        }
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    </Modal>
  )
}

ModalBoletin.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    boletinData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
    user: PropTypes.any,
}

const mapStateToProps = (state) => {
    const data = state.Login.user.userData;
    return { user: data };
};

export default withTranslation()(connect(mapStateToProps)(ModalBoletin))
