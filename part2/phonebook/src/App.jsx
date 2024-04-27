import React, { useState, useEffect } from "react"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"
import personService from "./personService"
import "./styles.css"
import Notification from "./Notification.jsx"

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
        setErrorMessage("Error fetching data from the server")
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

  const addPerson = async (event) => {
    event.preventDefault()

    // Client-side validation
    if (newName.length < 3) {
      setErrorMessage("Name must be at least 3 characters long.")
      return
    }

    try {
      // Prepare new person object
      const newPerson = { name: newName, number: newNumber }
      // Send create request to backend
      const createdPerson = await personService.create(newPerson)
      // Update the state with the new person
      setPersons([...persons, createdPerson])
      setSuccessMessage("Person added successfully.")
      // Clear the form fields after adding a person
      setNewName("")
      setNewNumber("")
    } catch (error) {
      console.error("Error adding person:", error)
      // Check if the error message indicates a validation error
      if (error.message === "Name must be at least 3 characters long.") {
        // Set an error message state variable to display to the user
        setErrorMessage("Name must be at least 3 characters long.")
      } else {
        // Handle other types of errors
        setErrorMessage("An error occurred while adding the person.")
      }
    }
  }

  const deletePerson = async (_id) => {
    try {
      console.log("Deleting person with ID:", _id) // Testing
      if (window.confirm("Are you sure you want to delete this person?")) {
        // Send delete request to backend
        await personService.remove(_id)
        // Update the state by removing the deleted person
        setPersons(persons.filter((person) => person._id !== _id))
        setSuccessMessage("Person deleted successfully.") // Set success message
        // Reload the window after successful deletion
        window.location.reload()
      }
    } catch (error) {
      console.error("Error deleting person:", error)
      setErrorMessage("An error occurred while deleting the person.") // Set error message
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
      {errorMessage && <Notification message={errorMessage} type="error" />}
      {successMessage && (
        <Notification message={successMessage} type="success" />
      )}{" "}
      {/* PersonList component */}
      <PersonList persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
