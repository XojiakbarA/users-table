

const TableCell = ({ children, style, colSpan, handleClick }) => {

    return (
        <td style={style} colSpan={colSpan}>
            <div onClick={handleClick}>{children}</div>
        </td>
    )
}

export default TableCell