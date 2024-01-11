import { useDispatch, useSelector } from "react-redux"
import { voteOn } from "../reducers/anecdoteReducer"
import { createNotification, deleteNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })
    const dispatch = useDispatch()

    const vote = (id, content) => {
      dispatch(voteOn(id))
      dispatch(createNotification(`you voted '${content}'`))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
