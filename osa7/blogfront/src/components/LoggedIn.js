const LoggedIn = ({ user, handleLogout }) => {
    return (
        <div>
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>Log out </button>
        </div>
    )
}

export default LoggedIn
