import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
const ActionColumn = ({ row, t, openEditDialog, openEditDialogDelete }) => {
    return (
        <div className='d-flex justify-content-around'>
            <div className='me-2 me-lg-0'>
                <button className='btn btn-outline-primary' type='button' onClick={() => openEditDialog(row.id)} >
                    <i className="mdi mdi-eye-outline font-size-16 align-middle me-2"></i>
                    {t("View detail")}
                </button>
            </div>
            <div className=''>
                <button className={`btn btn-outline-danger`} onClick={() => openEditDialogDelete(row.id)}>
                    <i className="bx bx-trash font-size-16 align-middle me-2"></i> {t("Delete")}
                </button>
            </div>
        </div>
    )
}
ActionColumn.propTypes = {
    row: PropTypes.any,
    t: PropTypes.any,
    openEditDialog: PropTypes.any,
    openEditDialogDelete: PropTypes.any
}

export default ActionColumn;
