import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlog(state, action) {
            const blog = action.payload
            state.push(blog)
        },
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch(addBlog(newBlog))
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const { addBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
