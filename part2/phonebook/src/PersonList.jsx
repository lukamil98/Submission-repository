import React from "react"

const PersonList = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default PersonList
