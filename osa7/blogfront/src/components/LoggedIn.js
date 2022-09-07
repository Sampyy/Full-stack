import { useSelector } from 'react-redux'

const LoggedIn = ({  handleLogout }) => {
    const user = useSelector((state) => state.user)
    return (
        <div>
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>Log out </button>
        </div>
    )
}

export default LoggedIn
