import React from 'react';
import PropTypes from "prop-types";
const formatterColumnValue = (t) => {
    return [t("Inactive"), t("Active")]
}

const formatterColumnColor = ['danger', 'success']

const FormatterColumn = ({
    cell, t, row
}) => (
    <span className={`badge rounded-pill badge-soft-${formatterColumnColor[+cell]}`}>
        {formatterColumnValue(t)[+cell]} {!row?.hasPass && '*'}
    </span>
)

FormatterColumn.propTypes = {
    cell: PropTypes.any,
    row: PropTypes.any,
    t: PropTypes.any,
};

export default FormatterColumn
