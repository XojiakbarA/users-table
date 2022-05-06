

const Pagination = ({
    page, count, perPage, limit,
    onPageClick, onPrevClick, onNextClick, onPerPageChange
}) => {

    const array = Array.from({length: count}, (_, i) => i + 1)

    return (
        <div className="pagination-wrapper">
            <button onClick={onPrevClick}>Prev</button>
            <div>
                {
                    array.map(item => (
                        <button
                            key={item}
                            className={`button-pagin ${item === page ? 'button-active' : null}`}
                            onClick={ e => onPageClick(e, item) }
                        >
                            { item }
                        </button>
                    ))
                }
            </div>
            <button onClick={onNextClick}>Next</button>
            <div>
            <label htmlFor="per-page">Per Page</label>
            <select id="per-page" value={limit} onChange={onPerPageChange}>
                {
                    perPage.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))
                }
            </select>
            </div>
        </div>
    )
}

export default Pagination