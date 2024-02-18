import { useState } from "react"
import { useMutation } from "@apollo/client"

import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries"

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}]
  })
  
  const submit = async (event) => {
    event.preventDefault()

    const publishedInt = parseInt(published)

    createBook({ variables: { title, published: publishedInt, author, genres } })
    
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
  }

  const addGenre = (event) => {
    event.preventDefault()

    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title<input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author<input value={author} onChange={({target}) => setAuthor(target.value) }/>
        </div>
        <div>
          published<input value={published} onChange={({target}) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({target}) => setGenre(target.value)} />
          <button onClick={addGenre}>add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default BookForm