import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {} from "../../store/actions";

import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoPng from "../../assets/images/myboletin.png";
import logoAlonePng from "../../assets/images/myboletin-alone.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="vertical-menu">
          <div className="navbar-brand-box">
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logoAlonePng} alt="" height="70" /> o
              </span>
              <span className="logo-lg">
                <img src={logoPng} alt="" height="100" />
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img
                  height="30"
                  src={logoAlonePng}
                  alt=""
                />
              </span>
              <span className="logo-lg">
                <img src={logoPng} alt="" height="120" />
              </span>
            </Link>
          </div>
          <div data-simplebar className="h-100">
            {this.props.type !== "condensed" ? (
              <SidebarContent />
            ) : (
              <SidebarContent />
            )}
          </div>
          <div className="sidebar-background"></div>
        </div>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStateToProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
