import PropTypes from "prop-types";
import React, { Component } from "react";
import { Alert, Button, Card, CardBody, Col, Container, Row, Label } from "reactstrap";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";

// Translation
import { withTranslation } from "react-i18next";
import { backgroundColor } from "../../helpers/Styles/backgroundColor";
import {put} from "../../helpers/api_helper";
import {showToast} from "../../components/Common/notifications";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      lastName: "",
      idx: 1,
      names: "",
      mobile: "",
      document: "",
      documentType: "",
    };
  }

  async updatePassword(data, cb) {
    try {
      await put(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/updatePassword`, data)
      showToast({message:"Contraseña actualizada correctamente"});
      cb()
    } catch (e) {
      let message = e.response?.data?.message || "Hubo un error al actualizar la contraseña";
      if(Array.isArray(message)){
        message = message.join(";")
      }
      showToast({title: "Error", toastType:"error", message});
    }
  }

  componentDidMount() {
    if (localStorage.getItem("authUser")) {
      // const obj = JSON.parse(localStorage.getItem("authUser"));
      // const {data} = obj
      const {user} = this.props;
      this.setState({
        name: user.nombreUsuario,
        email: user.correo,
        idx: user.id,
        names: user.nombre,
        mobile: user.telefono,
        document: user.document,
        lastName: user.apellido,
        documentType: user.tipoIdentificacion,
        address: user.direccion,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props !== prevProps) {
      // const obj = JSON.parse(localStorage.getItem("authUser"));
      // const {data} = obj
      const { user } = this.props;
      this.setState({
        name: user.nombreUsuario,
        email: user.correo,
        idx: user.id,
        names: user.nombre,
        mobile: user.telefono,
        document: user.identificacion,
        lastName: user.apellido,
        documentType: user.tipoIdentificacion,
        address: user.direccion,
      });
      setTimeout(() => {
        this.props.resetProfileFlag();
      }, 3000);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="Mi Boletin" breadcrumbItem={this.props.t("Profile")} />

            <Row>
              <Col lg="12">
                {this.props.error && this.props.error ? (
                  <Alert color="danger">{this.props.error}</Alert>
                ) : null}
                {this.props.success && this.props.success ? (
                  <Alert color="success">{this.props.success}</Alert>
                ) : null}

                <Card>
                  <CardBody>
                    <div className="d-flex">
                      <div className="me-3">
                        <img
                          src={avatar}
                          alt=""
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      </div>
                      <div className="align-self-center flex-1">
                        <div className="text-muted">
                          <h5>{this.state.name}</h5>
                          <p className="mb-1">{this.state.email}</p>
                          <p className="mb-0">Id no: #{this.state.idx}</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {
              this.props.user && <>
                <h4 className="card-title mb-4">{this.props.t("Profile user data")} </h4>
                <Card>
                  <CardBody>
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        names: (this.state && this.state.names) || "John",
                        lastName: (this.state && this.state.lastName) || "Doe",
                        mobile: (this.state && this.state.mobile) || "3017261728",
                        document: (this.state && this.state.document) || "1143456464646",
                        documentType: (this.state && this.state.documentType) || "",
                        address: (this.state && this.state.address) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        mobile: Yup.string()
                            .required('Por favor ingrese un número Valido')
                            .matches(/^[0-9]+$/, "Solo número")
                            .min(1, 'Debe ser mayor a un digito')
                            .max(15, 'Maximo 15 digitos'),
                      })}
                      onSubmit={values => {
                        this.props.editProfile({
                          telefono: `${values.mobile}`,
                          direccion: values.address,
                          id: this.state.idx,
                        });
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <Row>
                            <Col lg="4">
                              <Label for="names" className="form-label">
                                Nombre
                              </Label>
                              <Field
                                name="names"
                                type="text"
                                disabled
                                className="form-control"
                              />
                            </Col>
                            <Col lg="4">
                              <Label for="lastName" className="form-label">
                                Apellido
                              </Label>
                              <Field
                                name="lastName"
                                type="text"
                                disabled
                                className="form-control"
                              />
                            </Col>
                            <Col lg="4">
                              <Label for="documentType" className="form-label">
                                Tipo identificacion
                              </Label>
                              <Field
                                name="documentType"
                                type="text"
                                disabled
                                className="form-control"
                              />
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col lg="4">
                              <Label for="document" className="form-label">
                                {this.props.t("Profile document")}
                              </Label>
                              <Field
                                name="document"
                                type="text"
                                disabled
                                className="form-control"
                              />
                            </Col>
                            <Col lg="4">
                              <Label for="mobile" className="form-label">
                                {this.props.t("Profile mobile")}
                              </Label>
                              <Field
                                name="mobile"
                                type="number"
                                className={
                                  "form-control" +
                                  (errors.mobile && touched.mobile
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="mobile"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                            <Col lg="4">
                              <Label for="address" className="form-label">
                                {"Dirección"}
                              </Label>
                              <Field
                                name="address"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.address && touched.address
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="address"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>

                          </Row>
                          <Row lg="12">
                            <div className="text-center mt-4">
                              <Button type="submit" style={{...backgroundColor('orange')}}>
                                Actualizar
                              </Button>
                            </div>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </>
            }

            <h4 className="card-title mb-4">{"Cambiar Contraseña"} </h4>
            <Card>
              <CardBody>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                      oldPass: "",
                      newPass: "",
                      repeatNewPass: ""
                    }}
                    validationSchema={Yup.object().shape({
                      oldPass: Yup.string()
                          .required('Por favor ingrese su anterior contraseña'),
                      newPass: Yup.string().required('Contraseña requerida')
                          .min(6, 'Debe contener al menos 6 caracteres'),
                      repeatNewPass: Yup.string()
                          .oneOf([Yup.ref('newPass'), null], 'Las contraseñas deben coincidir'),
                    })}
                    onSubmit={(values, { resetForm }) => {
                      this.updatePassword({
                        id: this.props.user.id,
                        oldPass: values.oldPass,
                        newPass: values.newPass
                      },resetForm)
                    }}
                >
                  {({ errors, status, touched }) => (
                      <Form className="form-horizontal">
                        <Row>
                          <Col lg="12">
                            <Label for="names" className="form-label">
                              {"Contraseña Anterior"}
                            </Label>
                            <Field
                                name="oldPass"
                                type="password"
                                className={
                                    "form-control" +
                                    (errors.oldPass && touched.oldPass
                                        ? " is-invalid"
                                        : "")
                                }
                            />
                            <ErrorMessage
                                name="oldPass"
                                component="div"
                                className="invalid-feedback"
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col lg="6">
                            <Label for="mobile" className="form-label">
                              {"Nueva Contraseña"}
                            </Label>
                            <Field
                                name="newPass"
                                type="password"
                                className={
                                    "form-control" +
                                    (errors.newPass && touched.newPass
                                        ? " is-invalid"
                                        : "")
                                }
                            />
                            <ErrorMessage
                                name="newPass"
                                component="div"
                                className="invalid-feedback"
                            />
                          </Col>
                          <Col lg="6">
                            <Label for="repeatNewPass" className="form-label">
                              {"Confirmar contraseña"}
                            </Label>
                            <Field
                                name="repeatNewPass"
                                type="password"
                                className={
                                    "form-control" +
                                    (errors.repeatNewPass && touched.repeatNewPass
                                        ? " is-invalid"
                                        : "")
                                }
                            />
                            <ErrorMessage
                                name="repeatNewPass"
                                component="div"
                                className="invalid-feedback"
                            />
                          </Col>
                        </Row>
                        <Row lg="12">
                          <div className="text-center mt-4">
                            <Button type="submit" style={{...backgroundColor('orange')}}>
                              {"Actualizar Contraseña"}
                            </Button>
                          </div>
                        </Row>
                      </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
  resetProfileFlag: PropTypes.func,
  t: PropTypes.any,
  user: PropTypes.any,
};

const mapStateToProps = state => {
  const { error, success } = state.Profile;
  const user = state.Login.user.userData
  return { error, success, user };
};

export default withRouter(
  withTranslation()(connect(mapStateToProps, { editProfile, resetProfileFlag })(UserProfile))
);
