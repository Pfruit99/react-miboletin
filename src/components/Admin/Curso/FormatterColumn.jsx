import React from 'react';
import PropTypes from "prop-types"
const formatterColumnValue = (t) => {
    return [t("Inactive"), t("Active")]
}

const formatterColumnColor = ['danger', 'success']

const FormatterColumn = ({
    cell, t
}) => (
    <span className={`badge rounded-pill badge-soft-${formatterColumnColor[+cell]}`}>
        {formatterColumnValue(t)[+cell]}
    </span>
)

FormatterColumn.propTypes = {
    t: PropTypes.any,
    cell: PropTypes.any,
}

export default FormatterColumn
