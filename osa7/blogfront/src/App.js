import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
            setSuccessMessage('Logged in as ' + user.username)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('Incorrect username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        setUser(null)
        setSuccessMessage('Succesfully logged out')
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }

    const handleCreateBlog = async (blog) => {
        try {
            const addedBlog = await blogService.create(blog)

            setBlogs(blogs.concat(addedBlog))
            blogFormRef.current.toggleVisibility()
            setSuccessMessage(
                'Added a new blog: ' +
                    addedBlog.title +
                    ' by ' +
                    addedBlog.author
            )
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
            console.log(addedBlog)
        } catch (exception) {
            setErrorMessage('Blog couldn´t be added: ' + exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleAddLike = async (blog) => {
        try {
            const likedBlog = await blogService.addLike(blog)
            console.log(likedBlog)
            const newBlogs = []
            for (let i = 0; i < blogs.length; i++) {
                newBlogs[i] = blogs[i]
                if (blog.id === blogs[i].id) {
                    newBlogs[i].likes++
                }
            }
            newBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

            setBlogs(newBlogs)
        } catch (exception) {
            setErrorMessage('Like couldn`t be added: ' + exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleDelete = async (blog) => {
        try {
            if (window.confirm('Do you really want to delete the blog?')) {
                const blogToDelete = await blogService.deleteBlog(blog)
                console.log(blogToDelete)
            }
            blogService.getAll().then((blogs) => {
                blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
                setBlogs(blogs)
            })
        } catch (exception) {
            setErrorMessage('blog couldn`t be deleted: ' + exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={successMessage} success={true} />
            <Notification message={errorMessage} />
            {user === null ? (
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                />
            ) : (
                <div>
                    <LoggedIn user={user} handleLogout={handleLogout} />
                    <Toggleable
                        buttonLabel={'Add a new blog'}
                        ref={blogFormRef}
                    >
                        <BlogForm addBlog={handleCreateBlog} />
                    </Toggleable>
                    <h2>blogs</h2>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleAddLike={handleAddLike}
                            handleDelete={handleDelete}
                            user={user}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default App
