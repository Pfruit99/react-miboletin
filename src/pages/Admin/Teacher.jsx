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
import ModalDocente from "../../components/Admin/Docente/ModalDocente";

// Notification
import { showToast } from "../../components/Common/notifications";
import { getErrorMessageDocente } from "../../components/Common/errorMessage";
import FormatterColumn from "../../components/Admin/Docente/FormatterColumn";
import ActionColumn from "../../components/Admin/Docente/ActionColumn";
import { connect } from "react-redux";
import ModalDeleteDocente from "../../components/Admin/Docente/ModalDeleteDocente";

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
      modal_delete: false,
      loadingForm: false,
      loadTable: false,
      docente:{
        id: undefined,
      }
    };
    this.tog_xlarge = this.tog_xlarge.bind(this)
    this.tog_delete = this.tog_delete.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickCloseDelete = this.handleClickCloseDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createDocente = this.createDocente.bind(this)
    this.createDocente = this.createDocente.bind(this)
    this.handleOpenEditDialog = this.handleOpenEditDialog.bind(this)
    this.handleOpenEditDialogDelete = this.handleOpenEditDialogDelete.bind(this)
    this.deleteDocente = this.deleteDocente.bind(this)
  }
  // fetch Api
  async loadData (state) {
    this.setState({loadTable: true})
    let { sizePerPage, page, sortField, searchText, sortOrder } = state;
    if(!searchText) searchText = '';
    try {
      const result = await helpAPI.get(`${import.meta.env.VITE_APP_BACKEND_URL}/docentes/findTable?pageSize=${sizePerPage}&currentPage=${page}&orderBy=${sortField}&search=${searchText && searchText}&orderDirection=${sortOrder === 'desc' ? '-' : '%2B'}`)
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
  async createDocente (values) {
    try {
      delete values.id;
      this.setState({loadingForm:true});
      await helpAPI.post(`${import.meta.env.VITE_APP_BACKEND_URL}/docentes`, {...values })
      console.log("creado correctamente");
      showToast({message:this.props.t("Docente created successfully")});
      this.tog_xlarge();
      const state = this.tableRef.current.getNewestState();
      this.loadData(state)
    } catch (error) {
      console.log('error', error.response.data.error)
      showToast({toastType:'error',title:"Error",message:getErrorMessageDocente(error?.response?.data.error, this.props.t)})
    } finally {
      this.setState({loadingForm:false});
    }
  }
  async updateDocente (values, id){
    try {
      delete values.id;
      await helpAPI.put(`${import.meta.env.VITE_APP_BACKEND_URL}/docentes/${id}`, { ...values })
      this.setState({loadingForm:true});
      showToast({message:this.props.t("Docente updated successfully")});
      this.tog_xlarge();
      const state = this.tableRef.current.getNewestState();
      this.loadData(state)
    } catch (error) {
      console.log('error', error.response.data.error)
      showToast({toastType:'error',title:"Error",message:getErrorMessageDocente(error?.response?.data.error, this.props.t)})
    } finally{
      this.setState({loadingForm:false});
    }
  }

  async deleteDocente(id,data) {
    try {
      this.setState({loadingForm:true});
      await helpAPI.del(`${import.meta.env.VITE_APP_BACKEND_URL}/docentes/${id}`)
      showToast({message:this.props.t("Docente eliminado correctamente")});
      this.tog_delete();
      const state = this.tableRef.current.getNewestState();
      this.loadData(state)
    } catch (error) {
      console.log('error test', error)
      showToast({message:this.props.t("Docente eliminado correctamente")});
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
      docente: !prevState.modal_xlarge ? prevState.docente : {id:null}
    }))
    this.removeBodyCss()
  }

  tog_delete() {
    this.setState(prevState => ({
      modal_delete: !prevState.modal_delete,
      docente: !prevState.modal_delete ? prevState.docente : {id:null}
    }))
    this.removeBodyCss()
  }

  handleClickClose(){
    this.setState({ modal_xlarge: false, docente : {id:null} })
  }
  handleClickCloseDelete(){
    this.setState({ modal_delete: false, docente : {id:null} })
  }

  handleOpenEditDialog(id){
    this.setState({
      docente:{
        ...this.state.docente,
        id
      }
    })
    this.tog_xlarge();
  }
  handleOpenEditDialogDelete(id){
    this.setState({
      docente:{
        ...this.state.docente,
        id
      }
    })
    this.tog_delete();
  }

  handleSubmit(value, id){
    if(!id) return this.createDocente(value)
    return this.updateDocente(value,id)
  }


  render() {
    const columns = [
      {
        dataField: "id",
        text: "Id",
        sort: true,
      },
      {
        dataField: "nombre",
        text: this.props.t("Profile names"),
        sort: false,
        formatter: (cell,row) => `${row.usuario.nombre || ''} ${row.usuario.apellido || ''}`
      },
      {
        dataField: "identificacion",
        text:this.props.t("Profile document"),
        sort: false,
        formatter: (cell, row) => row.usuario.identificacion || "Docente no tiene identificacion",
      },
      {
        dataField: "correo",
        text: this.props.t("Login email"),
        formatter: (cell, row) => row.usuario.correo || this.props.t("Docente does not has email"),
        sort: false,
      },
      {
        dataField: "codDocente",
        text: "Codigo Docente",
        formatter: (cell) => cell || "Sin Usuario",
        sort: true,
      },
      {
        dataField: "actions",
        text: this.props.t("Actions"),
        sort: false,
        formatter: (cell, row, rowIndex) => {
          return (
              <ActionColumn row={row} t={this.props.t} openEditDialog={this.handleOpenEditDialog} openEditDialogDelete={this.handleOpenEditDialogDelete} />
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
              <Breadcrumbs title={this.props.t("Administrator")} breadcrumbItem={this.props.t("Docentes")} />

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
                                      <Col md="8">
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
                                      {/* <Col md="4">
                                        <MyExportCSV {...toolkitProps.csvProps} />
                                      </Col> */}
                                      <Col md="4">
                                        <div className="d-flex justify-content-end">
                                          <button
                                              type="button"
                                              onClick={this.tog_xlarge}
                                              className="btn btn-primary"
                                              data-toggle="modal"
                                              data-target=".bs-example-modal-xl"
                                          >
                                            {"Nuevo Docente"}
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
          <ModalDocente
              docenteData={this.state.data}
              isOpen={this.state.modal_xlarge}
              handleClickClose={this.handleClickClose}
              togModal={this.tog_xlarge}
              handleSubmit={this.handleSubmit}
              loading={this.state.loadingForm}
              id={this.state.docente.id}
          />
          <ModalDeleteDocente
            isOpen={this.state.modal_delete}
            handleClickClose={this.handleClickCloseDelete}
            togModal={this.tog_delete}
            handleSubmit={this.deleteDocente}
            loading={this.state.loadingForm}
            id={this.state.docente.id}
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
