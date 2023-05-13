import React from 'react';
import {Col, Row,} from "reactstrap";
import {backgroundColor} from "../../helpers/Styles/backgroundColor";
import CustomButton from "../Common/CustomButton";
import 'react-loading-skeleton/dist/skeleton.css'
import TableConsumption from "../Common/TableConsumption";
import {toggleFullscreen} from "../Common/toogleFullScreen";

const FormConsumption = ({
    sendConsumptions,
    loading,
    door,
    consumptions,
 }) => {
    return (
        <>
            <div className="dropdown d-none d-lg-inline-block ms-1">
                <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="btn header-item noti-icon"
                    data-toggle="fullscreen"
                >
                    {/*<i className="bx bx-fullscreen"></i>*/}
                </button>
            </div>
            <div className="container">
                <div className="card m-4">
                    <div className="card-body">
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <h2 className="text-center">{""}</h2>
                            </Col>
                        </Row>
                        <Row className={ "justify-content-md-center text-center"}>
                            <Col lg={12} className="">
                                <CustomButton loading={loading} disabled={loading} className="btn btn-primary" style={{...backgroundColor('orange')}} onClick={() => sendConsumptions(door)}>
                                    <h2 className="text-white">Imprimir</h2>
                                </CustomButton>
                            </Col>
                            <Col lg={12} className="mt-4">
                                <TableConsumption
                                    consumption={consumptions}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormConsumption;
