const Person = ({ array, handleDelete }) =>
    array.map(person => {
        return (
            <div key={person.name}>
                {person.name} {person.number} <button id={person.id} onClick={() => handleDelete(person.id)}> delete</button>
            </div>
        )
    }
    )

export default Person