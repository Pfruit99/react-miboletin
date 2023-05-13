import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <div className="container-fluid">
            <Row>
              <Col sm={6}>{new Date().getFullYear()} © OPP FILM.</Col>
              <Col sm={6}>
                <a
                  href="https://dbrain.com.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm-end d-none d-sm-block"
                >
                  Desarrollado por BRAIN S.A.S.
                </a>
              </Col>
            </Row>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
