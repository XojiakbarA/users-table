

const InputSearch = ({ endIcon }) => {
    
    return (
        <div className="input-wrapper">
            <input
                className="input-search"
                type="text"
                name="query"
                placeholder="Search"
            />
            <div className="search-icon">
                {endIcon}
            </div>
        </div>
    )
}

export default InputSearch