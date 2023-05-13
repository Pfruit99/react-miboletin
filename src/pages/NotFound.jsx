import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import PropTypes from 'prop-types';
//Import Images
import error from "../assets/images/error-img.png"
import { backgroundColor, colorText } from "../helpers/Styles/backgroundColor"
//I18N
import { withTranslation } from "react-i18next";
const NotFound = ({t}) => {
    //meta title

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 className="display-2 font-weight-medium">
                  4<i className="bx bx-buoy bx-spin display-3" style={{...colorText('green')}} />
                  4
                </h1>
                <h4 className="text-uppercase">{t("Page not Found")}</h4>
                <div className="mt-5 text-center">
                  <Link
                    className="btn"
                    style={{...backgroundColor('green')}}
                    to="/dashboard"
                  >
                    {t("Back to dashboard")}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={error} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

NotFound.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(NotFound)
