import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
            dispatch(setNotification('Logged in as ' + user.username, false))
        } catch (exception) {
            dispatch(setNotification('Incorrect username or password', true))
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        setUser(null)
        dispatch(setNotification('Succesfully logged out', false))
    }

    /*const handleCreateBlog = async (blog) => {
        try {
            const addedBlog = await blogService.create(blog)
            dispatch(addBlog(addedBlog))
            setBlogs(blogs.concat(addedBlog))
            blogFormRef.current.toggleVisibility()
            dispatch(
                setNotification(
                    'Added a new blog: ' +
                        addedBlog.title +
                        ' by ' +
                        addedBlog.author,
                    false
                )
            )
            console.log(addedBlog)
        } catch (exception) {
            dispatch(
                setNotification('Blog couldn´t be added: ' + exception, true)
            )
        }
    }*/

    /*const handleAddLike = async (blog) => {
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
            dispatch(
                setNotification('Like couldn`t be added: ' + exception, true)
            )
        }
    }*/

    /*const handleDelete = async (blog) => {
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
            dispatch(
                setNotification('blog couldn`t be deleted: ' + exception, true)
            )
        }
    }*/

    /*useEffect(() => {
        blogService.getAll().then((blogs) => {
            blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
            setBlogs(blogs)
        })
    }, [])*/

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    return (
        <div>
            <h1>Blogs</h1>

            <Notification />
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
                        <BlogForm user={user} blogFormRef={blogFormRef} />
                    </Toggleable>
                    <h2>blogs</h2>
                    <BlogList user={user} />
                </div>
            )}
        </div>
    )
}

export default App
