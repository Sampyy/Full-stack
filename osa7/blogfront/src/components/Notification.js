const Notification = ({ message, success }) => {
    if (message === null) {
        return null
    }

    if (success === true) {
        return <div className="success">{message}</div>
    }
    return <div className="error">{message}</div>
}

export default Notification
