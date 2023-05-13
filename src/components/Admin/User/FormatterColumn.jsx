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

export default FormatterColumn
