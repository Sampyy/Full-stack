import React from 'react'

const BlogForm = ({newAuthor, newTitle, url, handleAuthor, handleTitle, handleUrl, addBlog}) => {
    return(
        
        <form onSubmit={addBlog}>
            <div>
                author: <input
                value={newAuthor}
                onChange={handleAuthor}
                />
            </div>
            <div>
                url: <input
                value={newTitle}
                onChange={handleTitle}
                />
            </div>
            <div>
                url: <input
                value={url}
                onChange={handleUrl}
                />
            </div>
            <div>
                <button type='submit'>Add blog</button>
            </div>
        </form>
    )
}

export default BlogForm