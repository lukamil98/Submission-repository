import axios from "axios"

// Define the base URL for your backend API
const backendBaseUrl =
  "https://fullstackopen-part3-ad09.onrender.com/api/persons"

// Create an instance of Axios with the base URL
const instance = axios.create({
  baseURL: backendBaseUrl,
})

// Function to fetch all persons from the server
const getAll = () => {
  return instance.get("/").then((response) => response.data)
}

// Function to add a new person to the server
const create = (newPerson) => {
  return instance.post("/", newPerson).then((response) => response.data)
}

// Function to remove a person from the server by ID
const remove = (id) => {
  return instance.delete(`/${id}`)
}

// Function to update a person's information on the server
const update = (id, updatedPerson) => {
  return instance.put(`/${id}`, updatedPerson).then((response) => response.data)
}

// Object containing all the service functions
const personService = {
  getAll, // Fetch all persons
  create, // Add a new person
  remove, // Remove a person by ID
  update, // Update a person's information by ID
}

export default personService
