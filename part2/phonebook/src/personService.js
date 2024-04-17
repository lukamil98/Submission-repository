import axios from "axios"


const baseUrl = "http://localhost:3001/persons"

// Function to fetch all persons from the server
const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

// Function to add a new person to the server
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data)
}

// Function to remove a person from the server by ID
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// Function to update a person's information on the server
const update = (id, updatedPerson) => {
  // Send PUT request to the server to update a person's information by ID
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data)
}

// Object containing all the service functions
const personService = {
  getAll, // Fetch all persons
  create, // Add a new person
  remove, // Remove a person by ID
  update, // Update a person's information by ID
}

export default personService
