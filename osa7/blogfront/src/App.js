import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoggedIn from './components/LoggedIn'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { loginUser, clearUser, setUser } from './reducers/userReducer'

const App = () => {
    const user = useSelector((state) => state.user)

    const blogFormRef = useRef()

    const dispatch = useDispatch()

    /*const handleLogin = async (event) => {
        event.preventDefault()
        try {
            //const user = await loginService.login({ username, password })
            //setUser(user)
            const user = await dispatch(loginUser({ username, password }))
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
            dispatch(setNotification('Logged in as ' + user.username, false))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification('Incorrect username or password', true))
        }
    }*/

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        //setUser(null)
        dispatch(clearUser())
        dispatch(setNotification('Succesfully logged out', false))
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const tokenUser = JSON.parse(loggedUserJSON)
            dispatch(setUser(tokenUser))
            //setUser(user)
            blogService.setToken(tokenUser.token)
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
                />
            ) : (
                <div>
                    <LoggedIn handleLogout={handleLogout} />
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
