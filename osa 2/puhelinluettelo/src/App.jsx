import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('Added successfully')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`${person.name} deleted successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!(persons.map(person => person.name).includes(newName))) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`${returnedPerson.name} added successfully`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name == newName)
        const personId = person.id
        personService
          .update(personId, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`${person.name}'s number changed successfully`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      }
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} />

      <Filter filter={filter} onChange={handleFilterChange} />
      
      <h3>add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        name={newName}
        onChangeName={handleNameChange}
        number={newNumber}
        onChangeNumber={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      
      <Person array={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
