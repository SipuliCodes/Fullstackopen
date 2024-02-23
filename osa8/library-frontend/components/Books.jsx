import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const Books = () => {
  const result = useQuery(ALL_BOOKS, {
    variables: {
      author: undefined,
      genre: undefined
    }
  })

  if (result.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
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
    </div>
  )
}

export default Books