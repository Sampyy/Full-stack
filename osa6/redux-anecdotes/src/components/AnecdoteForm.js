import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteForm = (props) => {

const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    props.setNotification('You added anecdote "' + content + '"', 5)
}
return(
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
    </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm