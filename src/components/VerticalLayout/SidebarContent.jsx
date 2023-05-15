import PropTypes from "prop-types";
import React, { Component } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import {connect} from "react-redux";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.refDiv = React.createRef();
  }

  componentDidMount() {
    this.initMenu();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  // componentDidUpdate() {}

  scrollElement = item => {
    setTimeout(() => {
      if (this.refDiv.current !== null) {
        if (item) {
          const currentPosition = item.offsetTop;
          if (currentPosition > window.innerHeight) {
            if (this.refDiv.current)
              this.refDiv.current.getScrollElement().scrollTop =
                currentPosition - 300;
          }
        }
      }
    }, 300);
  };

  activateParentDropdown = item => {
    item.classList.add("active");
    const parent = item.parentElement;

    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      this.scrollElement(item);
      return false;
    }
    this.scrollElement(item);
    return false;
  };

  render() {
    const { roles } = this.props.user || {};
    return (
      <React.Fragment>
        <SimpleBar className="h-100 mt-4" ref={this.refDiv}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              {
                (roles.some(r => ["usuario", "administrador"].includes(r)))  &&
                    <li className="menu-title">{this.props.t("Administrator")}</li>

              }
              {
                (roles.some(r => ["usuario"].includes(r))) &&
                  <li>
                    <Link to="/#">
                      <i className="mdi mdi-food-fork-drink" />
                      <span>{this.props.t("Escuela")}</span>
                    </Link>
                    <ul className="sub-menu" aria-expanded="false">
                      {
                        roles.find(r => r === "usuario") &&
                          <li>
                            <Link to="/administration/rector">
                              <span>{"Rector"}</span>
                            </Link>
                          </li>
                      }
                      {
                        roles.find(r => r === "usuario") &&
                          <li>
                            <Link to="/administration/teacher">
                              <span>{"Profesor"}</span>
                            </Link>
                          </li>
                      }
                      {
                        roles.find(r => r === "usuario") &&
                          <li>
                            <Link to="/administration/student">
                              <span>{"Estudiante"}</span>
                            </Link>
                          </li>
                      }
                      {
                        roles.find(r => r === "usuario") &&
                          <li>
                            <Link to="/administration/school">
                              <span>{"Institución"}</span>
                            </Link>
                          </li>
                      }
                      {
                        roles.find(r => r === "usuario") &&
                          <li>
                            <Link to="/administration/contracts">
                              <span>{"Contratacion"}</span>
                            </Link>
                          </li>
                      }
                      {
                        roles.find(r => r === "usuario") &&
                          <li>
                            <Link to="/administration/course">
                              <span>{"Curso"}</span>
                            </Link>
                          </li>
                      }
                      {
                        roles.find(r => r === "usuario") &&
                          <li>
                            <Link to="/administration/subject">
                              <span>{"Asignatura"}</span>
                            </Link>
                          </li>
                      }
                    </ul>
                  </li>
              }
              {
                roles.find(r => r === "usuario") &&
                  <li>
                    <Link to="/administration/user">
                      <i className="bx bx-user-circle" />
                      <span>{this.props.t("User")}</span>
                    </Link>
                  </li>
              }
              {/* {
                roles.find(r => r === "usuario") &&
                  <li>
                    <Link to="/administration/rector">
                      <span>{"Rector"}</span>
                    </Link>
                  </li>
              } */}
              {/* {
                roles.find(r => r === "usuario") &&
                  <li>
                    <Link to="/administration/teacher">
                      <i className="mdi mdi-teach" />
                      <span>{"Profesor"}</span>
                    </Link>
                  </li>
              } */}
              {/* {
                roles.find(r => r === "usuario") &&
                  <li>
                    <Link to="/administration/student">
                      <i className="mdi mdi-school-outline" />
                      <span>{"Estudiante"}</span>
                    </Link>
                  </li>
              } */}
              {/* {
                roles.find(r => r === "usuario") &&
                  <li>
                    <Link to="/administration/school">
                      <i className="bx bxs-school" />
                      <span>{"Institución"}</span>
                    </Link>
                  </li>
              } */}
              {
                  (roles.some(r => ["usuario"].includes(r))) &&
                    <li className="menu-title">{this.props.t("Process")}</li>
              }
              {
                (roles.some(r => ["usuario"].includes(r))) &&
                  <li>
                      <Link to="/process/qualification">
                        <i className="bx bx-spreadsheet" />
                        <span>{this.props.t("Valoraciones")}</span>
                      </Link>
                      {/* <ul className="sub-menu" aria-expanded="false">
                        {
                          roles.find(r => r === "usuario") &&
                            <li>
                              <Link to="/process/reserve">{this.props.t("Reserves")}</Link>
                            </li>
                        }
                        {
                          roles.find(r => r === "usuario") &&
                            <li>
                              <Link to="/process/requestManagement">{this.props.t("Requests Management")}</Link>
                            </li>
                        }
                        {
                          roles.find(r => r === "usuario") &&
                            <li>
                              <Link to="/process/request">{this.props.t("Requests")}</Link>
                            </li>
                        }
                      </ul> */}
                  </li>
              }
              {
                (roles.some(r => ["usuario"].includes(r))) &&
                  <li className="menu-title">{this.props.t("Report")}</li>
              }
              {
                roles.find(r => r === "usuario") &&
                  <li>
                    <Link to="/report/reportCard">
                      <i className="bx bxs-report" />
                      <span>{this.props.t("Boletin")}</span>
                    </Link>
                  </li>
              }
            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    );
  }
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
  user: PropTypes.any,
};

const mapStateToProps = state => {
  return {
    user: state.Login.user.userData,
  };
};

export default withRouter(withTranslation()(connect(mapStateToProps, null)(SidebarContent)));
