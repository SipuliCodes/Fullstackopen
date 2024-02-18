import { useMutation } from "@apollo/client"
import { useState } from "react"
import { SET_BIRTHYEAR } from "../queries"
import Select from "react-select"

const BirthyearForm = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [setBirthyear] = useMutation(SET_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()

    const bornInt = parseInt(born)

    setBirthyear({ variables: { name: selectedAuthor.value, setBornTo: bornInt } })
    setBorn('')
  }

  authors = authors.map(a => ({ value: a.name, label: a.name }))
  return (
    <div>
      <h2>Set birthyear</h2>
      <form>
        <div>
          <Select
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authors}
          />
        </div>
        <div>
          born<input value={born} onChange={({target}) => setBorn(target.value)} />
        </div>
        <button onClick={submit}>update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm