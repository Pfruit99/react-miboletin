import { Row, Col } from 'reactstrap';
const ActionColumn = ({ row, t, openEditDialog, openEditDialogActivate }) => {
    return (
        <div className='d-flex justify-content-around'>
            <div className='me-2 me-lg-0'>
                <button className='btn btn-outline-primary' type='button' onClick={() => openEditDialog(row.id)} >
                    <i className="mdi mdi-eye-outline font-size-16 align-middle me-2"></i>
                    {t("View detail")}
                </button>
            </div>
            {/* <div className=''>
                <button className={`btn btn-outline-${row.status === 1 ? 'danger':'success'}`} onClick={() => openEditDialogActivate(row.id)}>
                    {
                        row.status === 1 ? <i className="bx bx-user-x font-size-16 align-middle me-2"></i>:
                        <i className="bx bx-user font-size-16 align-middle me-2"></i>
                    }
                    {
                        row.status === 1 ? t("To inactive") : t("To active")
                    }
                </button>
            </div> */}
        </div>
    )
}

export default ActionColumn;
