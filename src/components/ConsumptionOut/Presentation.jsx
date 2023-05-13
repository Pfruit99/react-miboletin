import React from 'react';
import {Col, Row} from "reactstrap";
import {withTranslation} from "react-i18next";
import logoOben from "../../assets/images/logo-oben-gray.png";
import shopImage from "../../assets/images/shop.png";
import {backgroundColor} from "../../helpers/Styles/backgroundColor";
import CustomButton from "../Common/CustomButton";
const Presentation = ({
    t,
    loadingButton,
    toggleFullscreen,
    onClick,
    ...props
                      }) => {
    return (
        <div className="min-vh-100 w-100">
            <Row className="justify-content-md-center">
                <Col md={5} className="">
                    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center mx-1">
                        <img src={logoOben} alt="Logo oben"/>
                    </div>
                </Col>
                <Col md={7} style={{...backgroundColor('gray')}}>
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
                    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                        <h2 className="text-light">RESERVA DE COMIDA</h2> <br/>
                        <h5 className="text-light">Reserva comida y deleitate con el menú de la semana</h5> <br/> <br/>
                        <CustomButton loading={loadingButton} disabled={loadingButton} onClick={onClick} className="btn" style={{...backgroundColor('orange')}}><h3 className="text-light">Reservar Ahora</h3></CustomButton> <br/> <br/> <br/>
                        <img src={shopImage} style={{height: "50%", width: "50%"}} alt="Shop image"/>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default withTranslation()(Presentation);
