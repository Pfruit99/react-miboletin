import PropTypes from "prop-types";
import React, { Component } from "react";
import { Alert, Card, CardBody, Col, Container, Label, Row } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// action
import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/myboletin.png";
import logo from "../../assets/images/logo.svg";
import {backgroundColor, colorText} from "../../helpers/Styles/backgroundColor";

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-soft" style={{...backgroundColor('gray')}}>
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-white">Solicitud de nueva contraseña</h5>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end py-4">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                      <p>Ingrese el correo electrónico registrado en la aplicación.</p>
                    <div className="p-2">
                      {this.props.forgetError && this.props.forgetError ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {this.props.forgetError}
                        </Alert>
                      ) : null}
                      {this.props.forgetSuccessMsg ? (
                        <Alert color="success" style={{ marginTop: "13px" }}>
                          {this.props.forgetSuccessMsg}
                        </Alert>
                      ) : null}

                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          correo:
                            (this.state && this.state.correo) || "",
                        }}
                        validationSchema={Yup.object().shape({
                          correo: Yup.string().required(
                            "Por favor ingrese su correo"
                          ),
                        })}
                        onSubmit={values => {
                          this.props.userForgetPassword(values, this.props.history);
                        }}
                      >
                        {({ errors, status, touched }) => (
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label for="correo" className="form-label">
                                Correo
                              </Label>
                              <Field
                                name="correo"
                                type="text"
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
                            <div className="text-end">
                              <button
                                className="btn w-md text-white"
                                type="submit"
                                style={{...backgroundColor('blue1')}}
                              >
                                Enviar
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Regresar al {" "}
                    <Link to="login" className="fw-medium" style={{...colorText('orange')}}>
                      Login
                    </Link>{" "}
                  </p>
                  {/*<p>*/}
                  {/*  © {new Date().getFullYear()} Brain*/}
                  {/*</p>*/}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.func,
  forgetSuccessMsg: PropTypes.string,
  history: PropTypes.object,
  userForgetPassword: PropTypes.any,
};

const mapStateToProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword;
  return { forgetError, forgetSuccessMsg };
};

export default withRouter(
  connect(mapStateToProps, { userForgetPassword })(ForgetPasswordPage)
);
