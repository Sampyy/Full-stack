import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
const dispatch = useDispatch()

const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification('You added anecdote "' + content + '"'))
    setTimeout(() => dispatch(removeNotification()), 5000)
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

export default AnecdoteForm