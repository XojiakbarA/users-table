import { useEffect, useState } from "react"
import InputSearch from "./components/InputSearch"
import Table from "./components/Table/Table"
import TableHead from "./components/Table/TableHead"
import TableBody from "./components/Table/TableBody"
import TableFoot from "./components/Table/TableFoot"
import TableRow from "./components/Table/TableRow"
import TableCell from "./components/Table/TableCell"
import DownIcon from "./components/DownIcon"
import Pagination from "./components/Pagination"
import SearchIcon from "./components/SearchIcon"

const App = () => {

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true)
            const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            const posts = await res.json()
            setPosts(posts)
            setLoading(false)
        }
        getPosts()
    }, [])

    return (
        <div className="wrapper">
            <InputSearch
                endIcon={<SearchIcon/>}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <span>ID</span>
                            <DownIcon/>
                        </TableCell>
                        <TableCell>
                            <span>Title</span>
                            <DownIcon/>
                        </TableCell>
                        <TableCell>
                            <span>Body</span>
                            <DownIcon/>
                        </TableCell>
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
                    <Pagination/>
                </TableFoot>
            </Table>
        </div>
    )
}

export default App