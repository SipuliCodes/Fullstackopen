import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import BirthyearForm from "./BirthyearForm"

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return null
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map(a => 
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>)}
        </tbody>
      </table>
      <BirthyearForm authors={result.data.allAuthors}/>
    </div>
  )
}

export default Authors