import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        addBlog({
            author: newAuthor,
            title: newTitle,
            url: newUrl,
            likes: 0,
        })

        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>add new blog</h2>
            <form onSubmit={createBlog}>
                <div>
                    author:{' '}
                    <input
                        value={newAuthor}
                        onChange={({ target }) => setNewAuthor(target.value)}
                        id="authorField"
                        placeholder="Author name"
                    />
                </div>
                <div>
                    title:{' '}
                    <input
                        value={newTitle}
                        onChange={({ target }) => setNewTitle(target.value)}
                        id="titleField"
                        placeholder="Title name"
                    />
                </div>
                <div>
                    url:{' '}
                    <input
                        value={newUrl}
                        onChange={({ target }) => setNewUrl(target.value)}
                        id="urlField"
                        placeholder="url for blog"
                    />
                </div>
                <div>
                    <button type="submit" id="addBlogButton">
                        Add blog
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm
