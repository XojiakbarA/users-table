import { useEffect } from "react"
import InputSearch from "../components/InputSearch"
import Table from "../components/Table/Table"
import TableHead from "../components/Table/TableHead"
import TableBody from "../components/Table/TableBody"
import TableFoot from "../components/Table/TableFoot"
import TableRow from "../components/Table/TableRow"
import TableCell from "../components/Table/TableCell"
import Pagination from "../components/Pagination"
import DownIcon from "../components/Icon/DownIcon"
import UpIcon from "../components/Icon/UpIcon"
import SearchIcon from "../components/Icon/SearchIcon"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { getPosts } from "../store/slices/postSlice"
import { useDebounce } from "../hooks/useDebounce"

const labels = [
    { title: 'ID', field: 'id' },
    { title: 'Title', field: 'title' },
    { title: 'Body', field: 'body' },
]

const Home = () => {

    const dispatch = useDispatch()

    const { loading, posts, total } = useSelector(state => state.posts)

    const [ searchParams, setSearchParams ] = useSearchParams()

    const searchParamsObj = Object.fromEntries(searchParams)

    const limit = searchParams.get('limit') ?? 5
    const page = searchParams.get('page') ?? 1
    const sort = searchParams.get('sort') ?? ''
    const order = searchParams.get('order') ?? ''
    const query = searchParams.get('q') ?? ''
    const count = total/limit

    const debouncedQuery = useDebounce(query, 700)

    useEffect(() => {
        dispatch(getPosts({ _limit: limit, _page: page, _sort: sort, _order: order, q: debouncedQuery}))
    }, [dispatch, limit, page, sort, order, debouncedQuery])

    const handlePageClick = (e, page) => {
        setSearchParams({ ...searchParamsObj, page })
    }
    const handlePrevClick = () => {
        if (page > 1) {
            setSearchParams({ ...searchParamsObj, page: Number(page) - 1 })
        }
    }
    const handleNextClick = () => {
        if (page < count) {
            setSearchParams({ ...searchParamsObj, page: Number(page) + 1 })
        }
    }
    const handlePerPageChange = (e) => {
        const limit = e.target.value
        setSearchParams({ ...searchParamsObj, limit })
    }
    const handleHeadClick = (e, sort) => {
        const nextSearchParams = { ...searchParamsObj, sort, order: 'asc' }

        if (order === 'asc') {
            nextSearchParams.order = 'desc'
        }
        if (order === 'desc') {
            delete nextSearchParams.order
        }
        if (!nextSearchParams.order) {
            delete nextSearchParams.sort
        }
        
        setSearchParams(nextSearchParams)
    }
    const handleQueryChange = (e) => {
        const q = e.target.value

        const nextSearchParams = { q }
        if (!q) {
            delete nextSearchParams.q
        }

        setSearchParams(nextSearchParams)
    }

    return (
        <div>
            <InputSearch
                name='q'
                placeholder='Search'
                value={query}
                onChange={handleQueryChange}
                endIcon={<SearchIcon/>}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            labels.map(item => (
                                <TableCell key={item.title} handleClick={ e => handleHeadClick(e, item.field) }>
                                    <span>{item.title}</span>
                                    {
                                        order === 'asc' && sort === item.field ?
                                        <DownIcon/> :
                                        order === 'desc' && sort === item.field ?
                                        <UpIcon/>
                                        : null
                                    }
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        loading
                        ?
                        <TableRow>
                            <TableCell colSpan={3}>
                                <h1>loading...</h1>
                            </TableCell>
                        </TableRow>
                        :
                        posts.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.body}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFoot colSpan={3}>
                    {
                        total > Number(limit)
                        &&
                        <Pagination
                            page={Number(page)}
                            count={count}
                            perPage={[5, 10]}
                            limit={Number(limit)}
                            onPageClick={handlePageClick}
                            onPrevClick={handlePrevClick}
                            onNextClick={handleNextClick}
                            onPerPageChange={handlePerPageChange}
                        />
                    }
                </TableFoot>
            </Table>
        </div>
    )
}

export default Home