import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = () => {
    const request = axios.get(baseUrl)
    
    return request.then(res => res.data)
}

const create = (newBlog) => {
    const request = axios.post(baseUrl, newBlog)
    return request.then(res => res.data)
}

const deleteId = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}

const update = (id, newBlog) =>{
    const request = axios.put(`${baseUrl}/${id}`, newBlog)
    return request.then(res => res.data)
}

export default {
    getAll,
    create,
    deleteId, 
    update
}