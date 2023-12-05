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
import useLoadAsignatura from '../../Hooks/Asignatura/useLoadAsignatura';
import TransferList from "../../Common/TransferList";
import {showToast} from "../../Common/notifications";
import {getErrorMessageAsignatura} from "../../Common/errorMessage";
import moment from 'moment';
import useLoadInstituciones from '../../Hooks/Institucion/useLoadInstituciones';
import useLoadDocentes from '../../Hooks/Docente/useLoadDocentes';
import useLoadAreas from '../../Hooks/Areas/useLoadAreas';
import useLoadNombreAsignaturas from '../../Hooks/NombreAsignaturas/useLoadNombreAsignaturas';
import useLoadPeriodos from '../../Hooks/Periodos/useLoadPeriodos';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import { DatePicker, TimePicker } from 'formik-material-ui-pickers';

const ModalAsignatura = ({
    t, // from withTranslation
    isOpen,
    asignaturaData,
    togModal,
    handleClickClose,
    handleSubmit,
    id,
    loading,
}) => {
    const [selectedAsignatura, setSelectedAsignatura] = useState(null);
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedCursos, setSelectedCursos] = useState([]);
    const {asignatura, loading:loadingAsignatura, cursos } = useLoadAsignatura(id, asignaturaData);
    const [institucionId, setInstitucionId] = useState(null);
    const { instituciones } = useLoadInstituciones();
    const { areas } = useLoadAreas();
    const { nombreAsignaturas, allNames, setNombreAsignaturas } = useLoadNombreAsignaturas();
    const { periodos } = useLoadPeriodos();
    const { docentes } = useLoadDocentes()
    useEffect(()=>{
        if(asignatura){
            setSelectedAsignatura({...asignatura, docenteId: asignatura?.docente?.id, institucionId: asignatura?.institucion?.id})
            setSelectedCursos(asignatura.cursos.map(c => c.id))
        }
    }, [asignatura])
    useEffect(()=>{
        if(instituciones.length > 0){
            setInstitucionId(instituciones[0].value)
        }
    },[instituciones])
    const onChange = (e) => {
        if(e.length > 1) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione solo 1 curso"})
        setSelectedCursos(e)
    }
    useEffect(()=>{
        if(selectedArea){
            const filteredNames = allNames.filter(n => n.areaId === +selectedArea)
            setNombreAsignaturas(filteredNames)
        } else {
            setNombreAsignaturas([])
        }
    },[selectedArea])
    useEffect(()=>{
        if(selectedAsignatura){
            const filteredNames = allNames.filter(n => n.areaId === selectedAsignatura.area.id)
            setNombreAsignaturas(filteredNames)
            setSelectedArea(selectedAsignatura.area.id)
        }
    },[selectedAsignatura])

  return (
    <Modal
        backdrop="static"
        size="lg"
        isOpen={isOpen}
        toggle={() => {
            setSelectedAsignatura(null)
            setSelectedCursos([])
            togModal()
        }}
    >
        <div className="modal-header">
            <h5
                className="modal-title mt-0"
                id="myExtraLargeModalLabel"
            >
                {
                    (loadingAsignatura || loading) ?
                        <i className="ms-2 fa-xl fas fa-spinner fa-pulse"></i> :
                        id && asignatura?.id ? `${t("Actualizar asignatura")} - ${asignatura.nombre.nombre}` :
                        t("Nueva Asignatura")
                }
            </h5>
            <button
                onClick={() => {
                    setSelectedAsignatura(null)
                    setSelectedCursos([])
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
                    id:  selectedAsignatura?.id || "",
                    nombre:  selectedAsignatura?.nombre?.id || "0",
                    periodo:  selectedAsignatura?.periodo?.id || "0",
                    area:  selectedAsignatura?.area?.id ? selectedAsignatura?.area?.id : 0,
                    horaInicio:  moment(selectedAsignatura?.horaInicio, 'HH:mm A') || "",
                    horaFin:  moment(selectedAsignatura?.horaFin, 'HH:mm A') || "",
                    year:  moment(selectedAsignatura?.year, 'YYYY') || "",
                    docenteId:  selectedAsignatura?.docenteId || "0",
                    institucionId: institucionId || selectedAsignatura?.institucionId || "0",
                    porcentajeAsistencia: +selectedAsignatura?.porcentajeAsistencia || 0,
                    porcentajeParcial: +selectedAsignatura?.porcentajeParcial || 0,
                    porcentajeClase: +selectedAsignatura?.porcentajeClase || 0,

                }}
                validationSchema={Yup.object().shape({
                nombre: Yup.string()
                    .required(t("Value required")),
                periodo: Yup.string()
                    .required(t("Value required")),
                area: Yup.string()
                    .required(t("Value required")),
                institucionId: Yup.string()
                    .required(t("Value required"))
                    .oneOf(instituciones.map(i => `${i.value}`)),
                docenteId: Yup.string()
                    .required(t("Value required"))
                    .oneOf(docentes.map(i => `${i.value}`)),
                porcentajeAsistencia: Yup.number()
                    .required(t("Value required")),
                porcentajeParcial: Yup.number()
                    .required(t("Value required")),
                porcentajeClase: Yup.number()
                    .required(t("Value required")),


                })}
                onSubmit={values => {
                    //if(selectedCursos.length === 0) return showToast({toastType:'error',title:"Error",message:"Por favor seleccione al menos 1 curso"})
                    values.institucionId = +values.institucionId
                    values.docenteId = +values.docenteId
                    values.periodo = +values.periodo;
                    values.area = +selectedArea;
                    values.nombre = +values.nombre;
                    values.horaInicio = moment(values.horaInicio).format('HH:mm A')
                    values.horaFin = moment(values.horaFin).format('HH:mm A')
                    console.log('values.year', values.year)
                    values.year = moment(values.year).format('YYYY') === 'Invalid date' ?  moment().format('YYYY') : moment(values.year).format('YYYY');
                    handleSubmit({...values },id)
                    setSelectedAsignatura(null)
                    setSelectedCursos([])
                }}
            >
                {({ errors, status, touched, setFieldValue, values }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Form className="needs-validation">
                        {/* Area, Nombre y año */}
                        <Row>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Área"}</Label>
                                    <Field
                                        name="area"
                                        as="select"
                                        value={selectedArea}
                                        onChange={(e) => {
                                            setSelectedArea(e.target.value)
                                        }}
                                        className={
                                            "form-control" +
                                            (errors.area && touched.area
                                                ? " is-invalid"
                                                : "")
                                    }>
                                        <option value="0">Seleccione una Opción</option>
                                        {areas.map(area => (
                                            <option value={area.value} key={area.value}>{area.label}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage
                                        name="area"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Nombre"}</Label>
                                    <Field
                                        name="nombre"
                                        as="select"
                                        className={
                                            "form-control" +
                                            (errors.nombre && touched.nombre
                                                ? " is-invalid"
                                                : "")
                                    }>
                                        <option value="0">Seleccione una Opción</option>
                                        {nombreAsignaturas.map(name => (
                                            <option value={name.value} key={name.value}>{name.label}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage
                                        name="nombre"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Año"}</Label>
                                    <Field
                                        component={DatePicker}
                                        name="year"
                                        views={["year"]}
                                        format="YYYY"
                                        className={
                                            "form-control" +
                                            (errors.year && touched.year
                                                ? " is-invalid"
                                                : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="year"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* Hora Inicio y finn */}
                        <Row>

                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Hora Inicio"}</Label>
                                    <Field
                                        component={TimePicker}
                                        name="horaInicio"
                                        className={
                                            "form-control" +
                                            (errors.horaInicio && touched.horaInicio
                                                ? " is-invalid"
                                                : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="horaInicio"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Hora Fin"}</Label>
                                    <Field
                                        component={TimePicker}
                                        name="horaFin"
                                        className={
                                            "form-control" +
                                            (errors.horaFin && touched.horaFin
                                                ? " is-invalid"
                                                : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="horaFin"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* institucion, Periodo y docente */}
                        <Row>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Institución"}</Label>
                                    <Field
                                        name="institucionId"
                                        as="select"
                                        disabled={true}
                                        className={
                                            "form-control" +
                                            (errors.institucionId && touched.institucionId
                                                ? " is-invalid"
                                                : "")
                                    }>
                                        <option value="0">Seleccione una Opción</option>
                                        {instituciones.map(inst => (
                                            <option value={inst.value} key={inst.value}>{inst.label}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage
                                        name="institucionId"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Período"}</Label>
                                    <Field
                                        name="periodo"
                                        as="select"
                                        className={
                                            "form-control" +
                                            (errors.periodo && touched.periodo
                                                ? " is-invalid"
                                                : "")
                                    }>
                                        <option value="0">Seleccione una Opción</option>
                                        {periodos.map(doc => (
                                            <option value={doc.value} key={doc.value}>{doc.label}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage
                                        name="periodo"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Docente"}</Label>
                                    <Field
                                        name="docenteId"
                                        as="select"
                                        className={
                                            "form-control" +
                                            (errors.docenteId && touched.docenteId
                                                ? " is-invalid"
                                                : "")
                                    }>
                                        <option value="0">Seleccione una Opción</option>
                                        {docentes.map(doc => (
                                            <option value={doc.value} key={doc.value}>{doc.label}</option>
                                        ))}

                                    </Field>
                                    <ErrorMessage
                                        name="docenteId"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* Porjectajes */}
                        <Row>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"% Actitudinal"}</Label>
                                    <Field
                                        name="porcentajeAsistencia"
                                        type="number"
                                        className={
                                            "form-control" +
                                            (errors.porcentajeAsistencia && touched.porcentajeAsistencia
                                                ? " is-invalid"
                                                : "")
                                    } />
                                    <ErrorMessage
                                        name="porcentajeAsistencia"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"% Procedimental"}</Label>
                                    <Field
                                        name="porcentajeParcial"
                                        type="number"
                                        className={
                                            "form-control" +
                                            (errors.porcentajeParcial && touched.porcentajeParcial
                                                ? " is-invalid"
                                                : "")
                                    } />
                                    <ErrorMessage
                                        name="porcentajeParcial"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="mb-3">
                                    <Label className="form-label">{"% Cognitivo"}</Label>
                                    <Field
                                        name="porcentajeClase"
                                        type="number"
                                        className={
                                            "form-control" +
                                            (errors.porcentajeClase && touched.porcentajeClase
                                                ? " is-invalid"
                                                : "")
                                    }/>
                                    <ErrorMessage
                                        name="porcentajeClase"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* cursos */}
                        {/* <Row>
                            <Col lg={12}>
                                <div className="mb-3">
                                    <Label className="form-label">{"Cursos"}</Label>
                                    <TransferList
                                        canFilter
                                        filterCallback={(Optgroup, filterInput) => {
                                            if (filterInput === '') {
                                                return true;
                                            }
                                            return (new RegExp(filterInput, 'i')).test(Optgroup.label);
                                        }}
                                        filterPlaceholder={`${t("Search")}...`}
                                        options={cursos}
                                        selected={selectedCursos}
                                        onChange={onChange}
                                    />
                                </div>
                            </Col>
                        </Row> */}

                        <div className="d-flex flex-wrap gap-2 mt-4">
                            <CustomButton type="submit" color="primary" loading={loading} disabled={loadingAsignatura || loading}>
                                {t("Send")}
                            </CustomButton>{" "}
                            <CustomButton type="reset" color="secondary" onClick={() => {
                                setSelectedAsignatura(null)
                                setSelectedCursos([])
                                handleClickClose()
                            }} disabled={loadingAsignatura || loading}>
                                {t("Cancel")}
                            </CustomButton>
                        </div>
                    </Form>
                </MuiPickersUtilsProvider>
                )}
            </Formik>
        </div>
    </Modal>
  )
}

ModalAsignatura.propTypes = {
    t: PropTypes.any,
    isOpen: PropTypes.bool,
    asignaturaData: PropTypes.any,
    togModal: PropTypes.func,
    handleClickClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

export default withTranslation()(ModalAsignatura)
