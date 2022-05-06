

const TableCell = ({ children, style, colSpan }) => {

    return (
        <td style={style} colSpan={colSpan}>
            <div>{children}</div>
        </td>
    )
}

export default TableCell