import { useQuery, useSubscription } from "@apollo/client"

import { ALL_BOOKS, BOOK_ADDED } from "../queries"
import { useState } from "react"
import { updateCache } from "../src/App"

const Books = () => {
  const [author, setAuthor] = useState(undefined)
  const [genre, setGenre] = useState(undefined)

  const result = useQuery(ALL_BOOKS, {
    variables: {
      author: author,
      genre: genre
    }
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
      window.alert(`Book ${addedBook.title} added`)
    }
  })

  const searchGenre = (genre) => {
    setGenre(genre)
    result.refetch()
  }

  if (result.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allBooks.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
            )}
        </tbody>
      </table>
      <button onClick={() => searchGenre("refactoring")}>refactoring</button>
      <button onClick={() => searchGenre("agile")}>agile</button>
      <button onClick={() => searchGenre('patterns')}>patterns</button>
      <button onClick={() => searchGenre("design")}>design</button>
      <button onClick={() => searchGenre("crime")}>crime</button>
      <button onClick={() => searchGenre("classic")}>classic</button>
      <button onClick={() => searchGenre(undefined)}>all genres</button>
    </div>
  )
}

export default Books