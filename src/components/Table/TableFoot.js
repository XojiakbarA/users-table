

const TableFoot = ({ children, colSpan }) => {

    return (
        <tfoot>
            <tr>
                <td colSpan={colSpan}>
                    {children}
                </td>
            </tr>
        </tfoot>
    )
}

export default TableFoot