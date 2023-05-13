import React from 'react';
import {Col, Row} from "reactstrap";

const ImageShower = ({
    images,
    handleInputDelete,
 }) => {
    return (
        <Row>
            {
                images.map(img => (
                    <Col md={3} key={img.id}>
                        <button
                            onClick={()=>handleInputDelete(img.id)}
                            type="button"
                            className="close-danger"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <img style={{ width: "100%", height: "100%" }} src={img.src} alt={img.altText} />
                    </Col>
                ))
            }
        </Row>
    );
};

export default ImageShower;
