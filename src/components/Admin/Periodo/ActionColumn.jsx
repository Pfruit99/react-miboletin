import React from 'react';
import PropTypes from 'prop-types';
const ActionColumn = ({ row, t, openEditDialog, openEditDialogActivate }) => {
    return (
        <div className='d-flex justify-content-around'>
            <div className=''>
                <button className={`btn btn-outline-${+row.activo === 1 ? 'danger':'success'}`} onClick={() => openEditDialogActivate(row.id)}>
                    {
                        +row.activo === 1 ? <i className="bx bx-user-x font-size-16 align-middle me-2"></i>:
                        <i className="bx bx-user font-size-16 align-middle me-2"></i>
                    }
                    {
                        +row.activo === 1 ? t("To inactive") : t("To active")
                    }
                </button>
            </div>
        </div>
    )
}
ActionColumn.propTypes = {
    row: PropTypes.any,
    t: PropTypes.any,
    openEditDialog: PropTypes.any,
    openEditDialogActivate: PropTypes.any
}

export default ActionColumn;
