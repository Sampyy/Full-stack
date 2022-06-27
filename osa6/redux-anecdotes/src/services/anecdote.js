import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const createAnecdote = async (content) => {
    const anecdote = { content, votes: 0}
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const voteAnecdote = async (id) => {
    const anecdoteToVote = await axios.get(`${baseUrl}/${id}`)
    const votedAnecdote = {...anecdoteToVote.data, votes: anecdoteToVote.data.votes + 1}

    const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
    return response.data
}

export default { getAll, createAnecdote, voteAnecdote }