import axios from "axios"

export const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const fetchPosts = async (params) => {
    return await instance.get('posts', { params })
}