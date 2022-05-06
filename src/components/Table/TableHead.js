

const TableHead = ({ children, style }) => {

    return (
        <thead style={style}>
            {children}
        </thead>
    )
}

export default TableHead