import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchPosts } from "../../api/posts"

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (params, { dispatch }) => {
        try {
            const res = await fetchPosts(params)
            if (res.status === 200) {
                dispatch(setTotal(res.headers['x-total-count']))
                return res.data
            }
        } catch (e) {
            console.log(e)
        }
    }
)

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        loading: false,
        total: 0,
        posts: []
    },
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload
        }
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.loading = true
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload
        }
    }
})

export const { setTotal } = postSlice.actions

export default postSlice.reducer