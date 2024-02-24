import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const RecommendedBooks = () => {
  const { data: userData } = useQuery(ME)
  const genre = userData?.me?.favoriteGenre
  const result = useQuery(ALL_BOOKS, {
    skip: !genre,
    variables: {
      author: undefined,
      genre: genre
    }
  })

  if (result.loading || !genre) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allBooks.map(book => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks