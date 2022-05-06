
const array = [1, 2, 3, 4, 5]

const Pagination = () => {

    return (
        <div className="pagination-wrapper">
            <button>Prev</button>
            <div>
                {
                    array.map(item => (
                        <button
                            key={item}
                            className={`button-pagin ${item === 1 ? 'button-active' : null}`}
                        >
                            { item }
                        </button>
                    ))
                }
            </div>
            <button>Next</button>
        </div>
    )
}

export default Pagination