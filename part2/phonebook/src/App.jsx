// App.jsx
import React, { useState, useEffect } from "react"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"
import personService from "./personService"
import Notification from "./Notification"

const App = () => {
  // State variables
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  // Fetch initial data from the server
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  // Event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleErrorMessage = (message, error) => {
    setErrorMessage(`${message} ${error.message}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }
  const addPerson = (event) => {
    event.preventDefault()

    // Check if the person already exists in the phonebook
    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      // Ask user to confirm updating the number if the person already exists
      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to update the number?`
        )
      ) {
        // Prepare updated person object with new number
        const updatedPerson = { ...existingPerson, number: newNumber }
        // Send update request to backend
        personService
          .update(existingPerson.id, updatedPerson)
          .then((updatedPerson) => {
            // Update the state with the updated person
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            )
            handleSuccessMessage("Person updated successfully.") // Set success message
          })
          .catch((error) => {
            handleErrorMessage("Error updating person:", error) // Set error message
          })
      }
    } else {
      // Prepare new person object
      const newPerson = { name: newName, number: newNumber }
      // Send create request to backend
      personService
        .create(newPerson)
        .then((createdPerson) => {
          // Update the state with the new person
          setPersons([...persons, createdPerson])
          handleSuccessMessage("Person added successfully.") // Set success message
        })
        .catch((error) => {
          console.error("Error adding person:", error)
        })
    }

    // Clear the form fields after adding/updating a person
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      // Send delete request to backend
      personService
        .remove(id)
        .then(() => {
          // Update the state by removing the deleted person
          setPersons(persons.filter((person) => person.id !== id))
          handleSuccessMessage("Person deleted successfully.") // Set success message
        })
        .catch((error) => {
          console.error("Error deleting person:", error)
        })
    }
  }

  // Filter the list of persons based on the search term
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter component */}
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add a new person</h2>
      {/* PersonForm component */}
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {/* Display error and success messages */}
      {errorMessage && <Notification message={errorMessage} />}
      {successMessage && <Notification message={successMessage} />}{" "}
      {/* PersonList component */}
      <PersonList persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
