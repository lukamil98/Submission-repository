import axios from "axios"

// Define the base URL for your backend API
const backendBaseUrl = "http://localhost:3001/"

// Create an instance of Axios with the base URL
const instance = axios.create({
  baseURL: backendBaseUrl,
})

// Function to fetch all persons from the server
const getAll = () => {
  return instance.get("/api/persons").then((response) => response.data)
}

// Function to add a new person to the server
const create = (newPerson) => {
  // Check if the person's name is shorter than 3 characters
  if (newPerson.name.length < 3) {
    // Throw an error with a specific message indicating the validation failure
    throw new Error("Name must be at least 3 characters long.")
  }

  // If the name is valid, make the POST request to the server
  return instance
    .post("/api/persons", newPerson)
    .then((response) => response.data)
    .catch((error) => {
      // Handle server-side errors and other errors
      if (error.response && error.response.data.error) {
        throw new Error(error.response.data.error) // Handle server-side errors
      } else {
        throw new Error("An unexpected error occurred.") // Handle other errors
      }
    })
}


// Function to remove a person from the server by ID
const remove = (_id) => {
  console.log("Removing person with ID:", _id) // Log the ID before deletion
  return instance
    .delete(`/api/persons/${_id}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.error) {
        throw new Error(error.response.data.error) // Handle server-side errors
      } else {
        throw new Error("An unexpected error occurred.") // Handle other errors
      }
    })
}

// Function to update a person's information by ID
const update = (_id, updatedPerson) => {
  return instance
    .put(`/api/persons/${_id}`, updatedPerson)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.error) {
        throw new Error(error.response.data.error) // Handle server-side errors
      } else {
        throw new Error("An unexpected error occurred.") // Handle other errors
      }
    })
}

// Object containing all the service functions
const personService = {
  getAll, // Fetch all persons
  create, // Add a new person
  remove, // Remove a person by ID
  update, // Update a person's information by ID
}

export default personService
