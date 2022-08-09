import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
const Blog = ({ blog, user }) => {
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()

    const showPartial = {
        display: visible ? 'none' : '',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }
    const showFull = {
        display: visible ? '' : 'none',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const handleVoteBlog = async () => {
        event.preventDefault()
        try {
            await dispatch(voteBlog(blog, blog.user))
            dispatch(
                setNotification('Voted ' + blog.title + ' by ' + blog.author)
            )
        } catch (exception) {
            dispatch(
                setNotification('Like couldn`t be added: ' + exception, true)
            )
        }
    }

    const handleDeleteBlog = async () => {
        event.preventDefault()
        try {
            if (window.confirm('Do you really want to delete the blog?')) {
                await dispatch(deleteBlog(blog))
                dispatch(
                    setNotification(
                        'Blog ' +
                            blog.title +
                            ' by ' +
                            blog.author +
                            ' has been deleted'
                    )
                )
            }
        } catch (exception) {
            dispatch(
                setNotification('blog couldn`t be deleted: ' + exception, true)
            )
        }
    }

    return (
        <div className="blog">
            <div style={showPartial} className="partialContent">
                {blog.title} {blog.author}
                <button onClick={() => setVisible(!visible)}>show</button>
            </div>
            <div style={showFull} className="fullContent">
                <div>
                    {blog.title}{' '}
                    <button onClick={() => setVisible(!visible)}>Hide</button>
                </div>
                <div>{blog.author} </div>
                <div>{blog.url} </div>
                <div>
                    likes {blog.likes}
                    <button onClick={() => dispatch(handleVoteBlog)}>
                        Like
                    </button>
                </div>
                <div>{blog.user.name}</div>
                {user.user.username === blog.user.username && (
                    <div>
                        <button onClick={() => handleDeleteBlog()}>Remove</button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Blog
