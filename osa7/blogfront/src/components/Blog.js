import React, { useState } from 'react'
const Blog = ({ blog, handleAddLike, handleDelete, user }) => {
    const [visible, setVisible] = useState(false)

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
                    <button onClick={() => handleAddLike(blog)}>Like</button>
                </div>
                <div>{blog.user.name}</div>
                {user.username === blog.user.username && (
                    <div>
                        <button onClick={() => handleDelete(blog)}>
                            Remove
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Blog
