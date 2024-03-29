import React from 'react'

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => {
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
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                        <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)} 
                        />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm