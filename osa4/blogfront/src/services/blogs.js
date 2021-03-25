import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => {
        return res.data
    })
}

const create = (newBlog) => {
    const request = axios.post(baseUrl, newBlog)
    return request.then(res => res.data)
}

export default {
    getAll,
    create
}