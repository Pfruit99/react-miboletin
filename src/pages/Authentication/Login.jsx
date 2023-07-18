import React, { Component } from "react";
import PropTypes from "prop-types";

import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";

import CustomButton from '../../components/Common/CustomButton';

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// actions
import { apiError, loginUser, socialLogin } from "../../store/actions";

// import images
import profile from "../../assets/images/myboletin.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/myboletin.svg";
//i18n
import { withTranslation } from "react-i18next";
import {backgroundColor} from "../../helpers/Styles/backgroundColor";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPassword: true,
    };
  }

  componentDidMount() {
    this.props.apiError("");
  }

  render() {
    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
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
                    <div className="auth-logo">
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={lightlogo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                      <Link to="/" className="auth-logo-dark">
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
                    <div className="p-2">
                    {this.props.error && this.props.error ? (
                      <Alert color="danger">{this.props.error}</Alert>
                    ) : null}
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          email:
                            (this.state && this.state.email) ||
                            "",
                          password:
                            (this.state && this.state.password) || "",
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().required(
                            "Por favor ingrese su email"
                          ),
                          password: Yup.string().required(
                            "Por favor ingrese una contraseña válida"
                          ),
                        })}
                        onSubmit={values => {
                          this.props.loginUser({
                            nombreUsuario: values.email,
                            clave: values.password
                          }, this.props.history);
                        }}
                      >
                        {({ errors, status, touched }) => (

                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label for="email" className="form-label">
                                {this.props.t("Login email")}
                              </Label>
                              <Field
                                name="email"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.email && touched.email
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label for="password" className="form-label">
                                {this.props.t("Login password")}
                              </Label>
                              <div className="input-group auth-pass-inputgroup">
                                <Field
                                  name="password"
                                  type={this.state.isPassword ? 'password' : 'text'}
                                  autoComplete="true"
                                  className={
                                    "form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <button
                                  className="btn btn-light "
                                  type="button"
                                  id="password-addon"
                                  onClick={() => this.setState({
                                    isPassword: !this.state.isPassword
                                  })}
                                >
                                  {
                                    this.state.isPassword ?
                                      <i className="mdi mdi-eye-outline"></i> :
                                      <i className="mdi mdi-eye-off-outline"></i>
                                  }
                                </button>
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </div>

                            {/* <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                {this.props.t("Login rememberMe")}
                              </label>
                            </div> */}

                            <div className="mt-3 d-grid">
                              <CustomButton
                                loading={this.props.loadingUser}
                                disabled={this.props.loadingUser}
                                style={{...backgroundColor('blue2')}}
                                className="btn btn-block text-white"
                                type="submit"
                              >
                                {this.props.t("Login")}
                              </CustomButton>
                            </div>
                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock me-1" /> {this.props.t("Login forgotPass")}
                              </Link>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                {/*<div className="mt-5 text-center">*/}
                {/*  <p>*/}
                {/*    © {new Date().getFullYear()} BRAIN.*/}
                {/*  </p>*/}
                {/*</div>*/}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
  t: PropTypes.any,
  loadingUser: PropTypes.bool,
};

const mapStateToProps = state => {
  const { error, loading } = state.Login;
  return { error, loadingUser: loading };
};

export default withRouter(
  withTranslation()(connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login))
);
