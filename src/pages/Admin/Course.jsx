import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import PropTypes from 'prop-types';
import * as helpAPI from '../../helpers/api_helper';
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "../../helpers/Styles/datatables.scss";

// Translation
import { withTranslation } from "react-i18next";
import ModalCurso from "../../components/Admin/Curso/ModalCurso";

// Notification
import { showToast } from "../../components/Common/notifications";
import { getErrorMessageCurso } from "../../components/Common/errorMessage";
import FormatterColumn from "../../components/Admin/Curso/FormatterColumn";
import ActionColumn from "../../components/Admin/Curso/ActionColumn";
import { connect } from "react-redux";

class DatatableTables extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      page: 1,
      sizePerPage: 10,
      data: [],
      totalSize: 0,
      modal_xlarge: false,
      modal_activate: false,
      loadingForm: false,
      loadTable: false,
      curso:{
        id: undefined,
      }
    };
    this.tog_xlarge = this.tog_xlarge.bind(this)
    this.tog_activate = this.tog_activate.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickCloseActivate = this.handleClickCloseActivate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createCurso = this.createCurso.bind(this)
    this.createCurso = this.createCurso.bind(this)
    this.handleOpenEditDialog = this.handleOpenEditDialog.bind(this)
    this.handleOpenEditDialogActivate = this.handleOpenEditDialogActivate.bind(this)
  }
  // fetch Api
  async loadData (state) {
    this.setState({loadTable: true})
    let { sizePerPage, page, sortField, searchText, sortOrder } = state;
    if(!searchText) searchText = '';
    try {
      const result = await helpAPI.get(`${import.meta.env.VITE_APP_BACKEND_URL}/cursos/findTable?pageSize=${sizePerPage}&currentPage=${page}&orderBy=${sortField}&search=${searchText && searchText}&orderDirection=${sortOrder === 'desc' ? '-' : ''}`)
      this.setState({
        data: result.data,
        totalSize: result.totalItem,
        page: result.currentPage,
        sizePerPage: result.pageSize,
      })
    } catch (error) {
      console.log('error', error)
    } finally {
      this.setState({loadTable: false})
    }
  }
  async createCurso (values) {
    try {
      delete values.id;
      this.setState({loadingForm:true});
      await helpAPI.post(`${import.meta.env.VITE_APP_BACKEND_URL}/cursos`, {...values })
      console.log("creado correctamente");
      showToast({message:this.props.t("Curso creada correctamente")});
      this.tog_xlarge();
      const state = this.tableRef.current.getNewestState();
      this.loadData(state)
    } catch (error) {
      console.log('error', error.response.data.error)
      showToast({toastType:'error',title:"Error",message:getErrorMessageCurso(error?.response?.data.error, this.props.t)})
    } finally {
      this.setState({loadingForm:false});
    }
  }
  async updateCurso (values, id){
    try {
      delete values.id;
      await helpAPI.put(`${import.meta.env.VITE_APP_BACKEND_URL}/cursos/${id}`, { ...values })
      this.setState({loadingForm:true});
      showToast({message:this.props.t("Curso actualizada correctamente")});
      this.tog_xlarge();
      const state = this.tableRef.current.getNewestState();
      this.loadData(state)
    } catch (error) {
      console.log('error', error.response.data.error)
      showToast({toastType:'error',title:"Error",message:getErrorMessageCurso(error?.response?.data.error, this.props.t)})
    } finally{
      this.setState({loadingForm:false});
    }
  }

  // other

  onTableChange = (type, newState) => {
    // handle any data change here
    this.loadData(newState);
  }

  removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  tog_xlarge() {
    this.setState(prevState => ({
      modal_xlarge: !prevState.modal_xlarge,
      curso: !prevState.modal_xlarge ? prevState.curso : {id:null}
    }))
    this.removeBodyCss()
  }

  tog_activate() {
    this.setState(prevState => ({
      modal_activate: !prevState.modal_activate,
      curso: !prevState.modal_activate ? prevState.curso : {id:null}
    }))
    this.removeBodyCss()
  }

  handleClickClose(){
    this.setState({ modal_xlarge: false, curso : {id:null} })
  }
  handleClickCloseActivate(){
    this.setState({ modal_activate: false, curso : {id:null} })
  }

  handleOpenEditDialog(id){
    this.setState({
      curso:{
        ...this.state.curso,
        id
      }
    })
    this.tog_xlarge();
  }
  handleOpenEditDialogActivate(id){
    this.setState({
      curso:{
        ...this.state.curso,
        id
      }
    })
    this.tog_activate();
  }

  handleSubmit(value, id){
    if(!id) return this.createCurso(value)
    return this.updateCurso(value,id)
  }


  render() {
    const columns = [
      {
        dataField: "id",
        text: "Id",
        sort: true,
      },
      {
        dataField: "grado",
        text: this.props.t("Grado"),
        sort: true,
      },
      {
        dataField: "fechaInicio",
        text:this.props.t("Fecha Inicio"),
        sort: true,
      },
      {
        dataField: "fechaFin",
        text: this.props.t("Fecha Fin"),
        sort: true,
      },
      {
        dataField: "institucion",
        text: this.props.t("Institucion"),
        sort: true,
        formatter: (cell, row) => row.institucion ? row.institucion.nombre: "No Institucion",
      },
      {
        dataField: "actions",
        text: this.props.t("Actions"),
        sort: false,
        formatter: (cell, row, rowIndex) => {
          return (
              <ActionColumn row={row} t={this.props.t} openEditDialog={this.handleOpenEditDialog} openEditDialogActivate={this.handleOpenEditDialogActivate} />
          )}
      },
    ];

    const defaultSorted = [
      {
        dataField: "id",
        order: "asc",
      },
    ];
    const MyExportCSV = props => {
      const handleClick = () => {
        props.onExport();
      };
      return (
          <div>
            <button className="btn btn-primary btn-sm" onClick={handleClick}>
              Exportar
            </button>
          </div>
      );
    };
    const pageOptions = {
      sizePerPage: this.state.sizePerPage,
      page: this.state.page,
      // sizePerPageList:1,
      totalSize: this.state.totalSize, // replace later with size(customers),
      custom: true,
      sizePerPageList: [ ...Array.apply(null, new Array(3)).map((el, i)=>({text:((i+1)*10).toString(), value: (i+1)*10})), {text: "Todos", value: this.state.totalSize}],
    };

    // Select All Button operation
    const selectRow = {
      mode: "checkbox",
    };

    const { SearchBar } = Search;

    //meta title
    return (
        <React.Fragment>
          <div className="page-content">
            <div className="container-fluid">
              <Breadcrumbs title={this.props.t("Administrator")} breadcrumbItem={this.props.t("Cursos")} />

              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <PaginationProvider
                          pagination={paginationFactory(pageOptions)}
                          keyField="id"
                          columns={columns}
                          data={this.state.data}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                                keyField="id"
                                columns={columns}
                                data={this.state.data}
                                search
                                loading={true}
                                exportCSV={{
                                  fileName: "usuarios.csv",
                                  onlyExportSelection: true,
                                  exportAll: true
                                }}
                            >
                              {toolkitProps => (
                                  <React.Fragment>
                                    <Row className="mb-2">
                                      <Col md="4">
                                        <div className="search-box me-2 mb-2 d-inline-block">
                                          <div className="position-relative">
                                            <SearchBar
                                                {...toolkitProps.searchProps}
                                                placeholder="Buscar"
                                            />
                                            <i className="bx bx-search-alt search-icon" />
                                          </div>
                                        </div>
                                      </Col>
                                      <Col md="4">
                                        <MyExportCSV {...toolkitProps.csvProps} />
                                      </Col>
                                      <Col md="4">
                                        <div className="d-flex justify-content-end">
                                          <button
                                              type="button"
                                              onClick={this.tog_xlarge}
                                              className="btn btn-primary"
                                              data-toggle="modal"
                                              data-target=".bs-example-modal-xl"
                                          >
                                            {"Nuevo Curso"}
                                          </button>
                                        </div>
                                      </Col>
                                    </Row>


                                    <Row>
                                      <Col xl="12">
                                        <div className="table-responsive">
                                          <BootstrapTable
                                              ref={this.tableRef}
                                              keyField={"id"}
                                              responsive
                                              hover
                                              bordered={false}
                                              striped={false}
                                              defaultSorted={defaultSorted}
                                              selectRow={selectRow}
                                              classes={
                                                "table align-middle table-nowrap"
                                              }
                                              onTableChange={this.onTableChange}
                                              headerWrapperClasses={"thead-light"}
                                              noDataIndication={this.props.t("Table no data available")}
                                              remote
                                              {...toolkitProps.baseProps}
                                              {...paginationTableProps}
                                          />
                                        </div>
                                      </Col>
                                    </Row>

                                    <Row className="align-items-md-center mt-30">
                                      <Col className="inner-custom-pagination d-flex">
                                        <div className="d-inline">
                                          <SizePerPageDropdownStandalone
                                              {...paginationProps}
                                          />
                                        </div>
                                        {
                                            this.state.loadTable &&
                                            <div className="ms-2 mt-2 d-flex">
                                              <small className="me-2">cargando </small><div className="dots-bars-6"></div>
                                            </div>
                                        }
                                        <div className="text-md-right ms-auto">
                                          <PaginationListStandalone
                                              {...paginationProps}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </React.Fragment>
                              )}
                            </ToolkitProvider>
                        )}
                      </PaginationProvider>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <ModalCurso
              cursoData={this.state.data}
              isOpen={this.state.modal_xlarge}
              handleClickClose={this.handleClickClose}
              togModal={this.tog_xlarge}
              handleSubmit={this.handleSubmit}
              loading={this.state.loadingForm}
              id={this.state.curso.id}
          />
        </React.Fragment>
    );
  }
}

DatatableTables.propTypes = {
  t: PropTypes.any,
  user: PropTypes.any,
}

const mapStateToProps = (state) => {
  const data = state.Login.user.userData;
  return { user: data };
};

export default withTranslation()(connect(mapStateToProps)(DatatableTables));