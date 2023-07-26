import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";
import * as helpAPI from '../../helpers/api_helper';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {showToast} from "../../components/Common/notifications";

// action
import {
  apiError,
  registerUser,
  registerUserFailed,
} from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// import images
import profile from "../../assets/images/myboletin.png";
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import { backgroundColor } from "../../helpers/Styles/backgroundColor";
import { withTranslation } from "react-i18next";
import { getErrorMessageUser } from "../../components/Common/errorMessage";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingForm: false,
    };
    this.registerUser = this.registerUser.bind(this);
  }

  componentDidMount() {
    this.props.apiError("");
    this.props.registerUserFailed("");
  }

  async registerUser (values) {
    try {
      this.setState({loadingForm:true});
      await helpAPI.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/register/platform`, {...values })
      console.log("registrado correctamente");
      showToast({message:this.props.t("User created successfully")});
      this.props.history.push('/login');
    } catch (error) {
      console.log('error', error)
      showToast({toastType:'error',title:"Error",message:getErrorMessageUser(error?.response?.data.error, this.props.t)})
    } finally {
      this.setState({loadingForm:false});
    }
  }

  render() {
    const t = this.props.t;
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={10} lg={8} xl={6}>
                <Card className="overflow-hidden">
                <div className="bg-soft" style={{...backgroundColor('gray')}}>
                    <Row>
                      <Col className="col-7">

                      </Col>
                      <Col className="col-5 align-self-end py-4">
                        <img fill="white" src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          correo:  this.state?.correo || "",
                          nombre:  this.state?.nombre || "",
                          apellido:  this.state?.apellido || "",
                          nombreUsuario:  this.state?.nombreUsuario || "",
                          identificacion:  this.state?.identificacion || "",
                          tipoIdentificacion:  this.state?.tipoIdentificacion || "",
                        }}
                        validationSchema={Yup.object().shape({
                          correo: Yup.string()
                              .email("Debe ser un email valido")
                              .max(200)
                              .required(t("Value required")),
                          nombre: Yup.string()
                              .required(t("Value required")),
                          apellido: Yup.string()
                              .required(t("Value required")),
                          nombreUsuario: Yup.string()
                              .required(t("Value required")),
                          identificacion: Yup.string()
                              .required(t("Value required")),
                          tipoIdentificacion: Yup.string()
                              .required(t("Value required"))
                              .oneOf(["cc", "ti", "ce"]),
                        })}
                        onSubmit={values => {
                          this.registerUser(values);
                        }}
                      >
                        {({ errors, status, touched }) => (
                          <Form className="form-horizontal">
                            {/* nombre, apellido */}
                    <Row>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Nombre"}</Label>
                                <Field
                                    name="nombre"
                                    type="text"
                                    placeholder="john"
                                    className={
                                        "form-control" +
                                        (errors.nombre && touched.nombre
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="nombre"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="mb-3">
                                <Label className="form-label">{"Apellido"}</Label>
                                <Field
                                    name="apellido"
                                    type="text"
                                    placeholder="Doe"
                                    className={
                                        "form-control" +
                                        (errors.apellido && touched.apellido
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="apellido"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* usuario correo */}
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <Label className="form-label">{"Usuario"}</Label>
                                        <Field
                                            name="nombreUsuario"
                                            type="text"
                                            placeholder="usuario"
                                            className={
                                                "form-control" +
                                                (errors.nombreUsuario && touched.nombreUsuario
                                                    ? " is-invalid"
                                                    : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="nombreUsuario"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <Label className="form-label">{"Correo electronico"}</Label>
                                        <Field
                                            name="correo"
                                            type="text"
                                            placeholder="ejemplo@ejemplo.com"
                                            className={
                                                "form-control" +
                                                (errors.correo && touched.correo
                                                    ? " is-invalid"
                                                    : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="correo"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            {/* identificacion */}
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <Label className="form-label">{"Tipo Identificacion"}</Label>
                                        <Field
                                            name="tipoIdentificacion"
                                            as="select"
                                            className={
                                                "form-control" +
                                                (errors.tipoIdentificacion && touched.tipoIdentificacion
                                                    ? " is-invalid"
                                                    : "")
                                        }>
                                            <option value="0">Seleccione una Opcion</option>
                                            <option value="cc">CC</option>
                                            <option value="ti">TI</option>
                                            <option value="ce">Cedula Extranjeria</option>

                                        </Field>
                                        <ErrorMessage
                                            name="tipoIdentificacion"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <Label className="form-label">{"Identificación"}</Label>
                                        <Field
                                            name="identificacion"
                                            type="text"
                                            className={
                                                "form-control" +
                                                (errors.identificacion && touched.identificacion
                                                    ? " is-invalid"
                                                    : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="identificacion"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </Col>
                            </Row>



                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Register
                              </button>
                            </div>

                            {/* <div className="mt-4 text-center">
                              <p className="mb-0">
                                By registering you agree to the Skote{" "}
                                <Link to="#" className="text-primary">
                                  Terms of Use
                                </Link>
                              </p>
                            </div> */}
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link to="/login" className="fw-medium text-primary">
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                  {/* <p>
                    © {new Date().getFullYear()} Skote. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger" /> by Themesbrand
                  </p> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  apiError: PropTypes.any,
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.any,
  registrationError: PropTypes.any,
  user: PropTypes.object,
  history: PropTypes.any,
  t: PropTypes.any,
};

const mapStateToProps = state => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default withRouter(
withTranslation()(connect(mapStateToProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register))
);
