import React from 'react'
import propTypes from 'prop-types'

const LoginForm = ({
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
}) => {
    LoginForm.propTypes = {
        username: propTypes.string.isRequired,
        password: propTypes.string.isRequired,
        setUsername: propTypes.func.isRequired,
        setPassword: propTypes.func.isRequired,
        handleLogin: propTypes.func.isRequired,
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <button type="submit" id="login-button">
                        login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
