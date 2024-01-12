import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const comparer = (a, b) => {
	if (a < b) {
		return 1
	} else if (a > b) {
		return -1
	} else {
		return 0
	}
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteOn(state, action) {
      const id = action.payload
      const anecdoteToVote = JSON.parse(JSON.stringify(state)).find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote).sort((anecdoteA, anecdoteB) => comparer(anecdoteA.votes, anecdoteB.votes))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

export const { voteOn, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const voteAnecdote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(id)
    dispatch(voteOn(votedAnecdote.id))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
