const Person = ({ array }) =>
    array.map(person =>
        <p key={person.name}>{person.name} {person.number} </p>)

export default Person